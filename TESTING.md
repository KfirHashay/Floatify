# Floatify Testing Guide

## Table of Contents
- [Testing Philosophy](#testing-philosophy)
- [Development Workflow](#development-workflow)
- [Testing Best Practices](#testing-best-practices)
- [Running Tests](#running-tests)
- [Writing New Tests](#writing-new-tests)
- [Visual Testing](#visual-testing)
- [CI Integration](#ci-integration)

## Testing Philosophy

Floatify's testing approach aims for comprehensive coverage while maintaining maintainability and reliability. The test suite should:

1. **Verify core functionality** - Ensure all features work as expected
2. **Guard against regressions** - Prevent previously fixed bugs from recurring
3. **Document expected behavior** - Tests should serve as living documentation
4. **Future-proof against React updates** - Use testing patterns compatible with React's evolution

## Development Workflow

The recommended workflow for developing Floatify is:

1. **Build and run the example app**:
   ```bash
   npm run dev
   ```
   This command:
   - Builds the package to the `dist` folder
   - Installs dependencies in the example app
   - Runs the example app in development mode

2. **Run tests during development**:
   ```bash
   npm test
   ```

3. **Run tests with coverage report**:
   ```bash
   npm test -- --coverage
   ```

## Testing Best Practices

### General Guidelines

1. **Test components in isolation** - Use mocks for dependencies
2. **Test both props and state** - Verify components respond correctly to props and internal state changes
3. **Test user interactions** - Verify components respond correctly to user events
4. **Test accessibility** - Verify components are accessible
5. **Test edge cases** - Verify components handle edge cases gracefully

### React Testing Guidelines

1. **Use React Testing Library** - Focus on testing behavior, not implementation details
2. **Avoid snapshot testing for components** - They're brittle and don't verify behavior
3. **Use screen queries** - Prefer `screen.getByRole` over direct DOM queries
4. **Test async behavior** - Use `waitFor` or `findBy` queries for async updates

### Floatify-Specific Guidelines

1. **Test state transitions** - Verify components transition between states correctly
2. **Test animations** - Verify animations are triggered with the correct classes
3. **Test mobile interactions** - Verify swipe gestures and touch interactions
4. **Test concurrency modes** - Verify different concurrency modes work as expected
5. **Test auto-dismiss behavior** - Verify auto-dismiss functionality works as expected

## Running Tests

Floatify uses [Vitest](https://vitest.dev/) for testing. The following commands are available:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run tests for a specific file
npm test -- tests/Floatify.test.tsx

# Run tests matching a specific pattern
npm test -- -t "renders children"
```

## Writing New Tests

When writing new tests, follow this structure:

```tsx
// 1. Import dependencies
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react/pure';
import YourComponent from '../path/to/YourComponent';

// 2. Set up before/after hooks if needed
beforeEach(() => {
  // Set up test environment
});

afterEach(() => {
  cleanup();
});

// 3. Group tests by feature or component
describe('YourComponent', () => {
  // 4. Test specific behaviors
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  // 5. Test user interactions
  it('should respond to user interaction', () => {
    render(<YourComponent />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeTruthy();
  });
});
```

## Visual Testing

Currently, Floatify relies on component tests that verify class names and DOM structure. For more robust visual testing:

1. Consider adding a visual regression testing tool like [Storybook](https://storybook.js.org/) + [Chromatic](https://www.chromatic.com/)
2. Set up a component library with Storybook to document and test visual states

## CI Integration

For continuous integration:

1. Run tests on each pull request
2. Block merges if tests fail
3. Generate and review coverage reports
4. Consider adding visual regression tests to CI pipeline
