# Auto-Dismiss Notification Behavior Review

## Current Implementation Analysis

### 1. Auto-Dismiss Duration Values

**Default Values:**
- Global `autoDismissTimeout`: 3000ms (3 seconds)
- Individual card `autoDismissDuration`: Can override global setting
- Auto-dismiss enabled by default: `false` (must be explicitly enabled)

**Configuration in AggregatorProvider:**
```typescript
autoDismiss = false,
autoDismissTimeout = 3000,
```

### 2. Relevant Code Components

**AggregatorProvider Auto-Dismiss Logic:**
```typescript
// Auto-dismiss logic: watch for newly added cards and set timers
useEffect(() => {
    if (!autoDismiss) {
        // Clear all timeouts if auto-dismiss is disabled
        timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
        timeoutsRef.current.clear();
        return;
    }

    // Clear existing timeouts
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current.clear();

    // Set up auto-dismiss for all active cards
    Object.values(state.channels).forEach((channel) => {
        channel.cards.forEach((card) => {
            // Check if this card should auto-dismiss
            const shouldAutoDismiss = card.autoDismiss !== undefined ? card.autoDismiss : autoDismiss;
            
            if (shouldAutoDismiss) {
                // Use card-specific duration or global timeout
                const duration = card.autoDismissDuration || autoDismissTimeout;
                
                const timeoutId = setTimeout(() => {
                    if (debug) {
                        console.log(`[Floatify] Auto-dismissing card ${card.id} after ${duration}ms`);
                    }
                    dispatch({
                        type: 'REMOVE_CARD',
                        payload: {
                            channelId: channel.channelId,
                            cardId: card.id,
                        },
                    });
                    // Clean up the timeout reference
                    timeoutsRef.current.delete(card.id);
                }, duration);

                // Store the timeout reference
                timeoutsRef.current.set(card.id, timeoutId);
            }
        });
    });

    // Cleanup function
    return () => {
        timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
        timeoutsRef.current.clear();
    };
}, [state.channels, autoDismiss, autoDismissTimeout, dispatch, debug]);
```

**Demo Component Usage:**
```typescript
const handleShow = () => {
    addCard('demo', {
        id: Date.now().toString(),
        title: 'Hello from Floatify',
        content: 'This card was triggered by a button click.',
        autoDismiss: true,
        autoDismissDuration: 3000
    })
}
```

### 3. Potential Issues Identified

#### Issue 1: Auto-Dismiss Default Setting
**Problem:** The `autoDismiss` prop defaults to `false` in AggregatorProvider
**Impact:** Cards won't auto-dismiss unless explicitly enabled

#### Issue 2: Card-Level Override Logic
**Problem:** The logic `card.autoDismiss !== undefined ? card.autoDismiss : autoDismiss` may not work as expected
**Impact:** If global `autoDismiss` is `false`, individual cards with `autoDismiss: true` should still work

#### Issue 3: State Change Dependencies
**Problem:** The useEffect dependency array includes `state.channels` which triggers on every state change
**Impact:** This could cause timeouts to be cleared and reset unnecessarily

#### Issue 4: Timeout Reference Management
**Problem:** Using `card.id` as the key for timeout storage
**Impact:** If multiple channels have cards with the same ID, timeouts could conflict

## 4. Steps to Reproduce the Issue

1. Open the example application
2. Navigate to the Examples page
3. Click "Auto-Dismiss (3s)" button
4. Observe if the notification disappears after 3 seconds
5. Check browser console for debug messages

## 5. Expected vs Actual Behavior

**Expected:**
- Notification appears immediately
- Notification automatically disappears after 3 seconds
- Debug message shows auto-dismiss action

**Actual (if broken):**
- Notification appears but doesn't auto-dismiss
- No debug messages about auto-dismiss
- Notification remains visible indefinitely

## 6. Console Errors/Warnings to Check

Look for:
- `[Floatify] Auto-dismissing card {id} after {duration}ms`
- Any JavaScript errors related to setTimeout/clearTimeout
- React warnings about memory leaks or unmounted components

## 7. Debugging Steps

1. **Enable Debug Mode:**
   ```typescript
   <Floatify debug autoDismiss={true}>
   ```

2. **Check Console Output:**
   - Look for auto-dismiss debug messages
   - Check for any error messages

3. **Verify Card Configuration:**
   ```typescript
   addCard('demo', {
       id: Date.now().toString(),
       title: 'Test Auto-Dismiss',
       content: 'This should disappear in 3 seconds',
       autoDismiss: true,
       autoDismissDuration: 3000
   })
   ```

4. **Test Different Scenarios:**
   - Global auto-dismiss enabled
   - Individual card auto-dismiss
   - Different duration values

## 8. Recommended Fixes

### Fix 1: Update Default Auto-Dismiss Setting
```typescript
// In AggregatorProvider
autoDismiss = true, // Change default to true
```

### Fix 2: Improve Timeout Key Management
```typescript
// Use combination of channelId and cardId for unique keys
const timeoutKey = `${channel.channelId}-${card.id}`;
timeoutsRef.current.set(timeoutKey, timeoutId);
```

### Fix 3: Optimize useEffect Dependencies
```typescript
// Create a more stable dependency array
const cardCount = Object.values(state.channels).reduce((count, channel) => count + channel.cards.length, 0);
// Use cardCount instead of state.channels in dependency array
```

### Fix 4: Add Error Handling
```typescript
const timeoutId = setTimeout(() => {
    try {
        if (debug) {
            console.log(`[Floatify] Auto-dismissing card ${card.id} after ${duration}ms`);
        }
        dispatch({
            type: 'REMOVE_CARD',
            payload: {
                channelId: channel.channelId,
                cardId: card.id,
            },
        });
    } catch (error) {
        console.error('[Floatify] Error during auto-dismiss:', error);
    } finally {
        timeoutsRef.current.delete(timeoutKey);
    }
}, duration);
```