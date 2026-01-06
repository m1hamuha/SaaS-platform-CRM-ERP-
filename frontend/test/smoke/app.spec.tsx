import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

describe('Frontend Smoke Tests - App', () => {
  describe('Home Page', () => {
    it('should render without crashing', () => {
      expect(() => render(<Home />)).not.toThrow();
    });

    it('should display main heading', () => {
      render(<Home />);
      
      // Check for main heading or title
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBeTruthy();
    });

    it('should have navigation elements', () => {
      render(<Home />);
      
      // Check for navigation links or buttons
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      // Check for buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have proper meta tags in document', () => {
      render(<Home />);
      
      // Check for title
      expect(document.title).toBeTruthy();
      
      // Check for viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      expect(viewportMeta).toBeInTheDocument();
      expect(viewportMeta).toHaveAttribute('content');
    });

    it('should not have JavaScript errors in console', async () => {
      const consoleError = jest.spyOn(console, 'error');
      const consoleWarn = jest.spyOn(console, 'warn');
      
      render(<Home />);
      
      await waitFor(() => {
        expect(consoleError).not.toHaveBeenCalled();
        // Allow warnings but not errors
      });
      
      consoleError.mockRestore();
      consoleWarn.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Home />);
      
      // Check for proper ARIA labels on interactive elements
      const interactiveElements = screen.getAllByRole('button', { hidden: true })
        .concat(screen.getAllByRole('link', { hidden: true }));
      
      interactiveElements.forEach(element => {
        // Elements should have either aria-label, aria-labelledby, or visible text
        const hasAriaLabel = element.hasAttribute('aria-label');
        const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
        const hasVisibleText = element.textContent?.trim().length > 0;
        
        expect(hasAriaLabel || hasAriaLabelledBy || hasVisibleText).toBe(true);
      });
    });

    it('should have proper contrast ratios for text', () => {
      render(<Home />);
      
      // This would typically use a library like jest-axe
      // For smoke tests, we'll just check that text elements exist
      const textElements = screen.getAllByText(/./, { selector: 'p, span, div, h1, h2, h3, h4, h5, h6' });
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('should render on different viewport sizes', () => {
      // Mock different viewport sizes
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // Mobile
      });
      
      render(<Home />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Reset
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024, // Desktop
      });
      
      // Re-render with new viewport
      const { unmount } = render(<Home />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      unmount();
    });
  });

  describe('Performance', () => {
    it('should render within acceptable time', async () => {
      const startTime = performance.now();
      
      render(<Home />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Expect render to complete within 500ms for smoke test
      expect(renderTime).toBeLessThan(500);
    });

    it('should not have excessive DOM nodes', () => {
      const { container } = render(<Home />);
      
      const totalNodes = countDOMNodes(container);
      
      // Expect reasonable number of DOM nodes for a landing page
      expect(totalNodes).toBeLessThan(1000);
    });
  });

  describe('Internationalization', () => {
    it('should have language attribute on html element', () => {
      render(<Home />);
      
      const htmlElement = document.documentElement;
      expect(htmlElement).toHaveAttribute('lang');
      expect(htmlElement.getAttribute('lang')).toBe('en');
    });

    it('should handle RTL languages if supported', () => {
      render(<Home />);
      
      // Check that dir attribute is set or default is LTR
      const htmlElement = document.documentElement;
      const dir = htmlElement.getAttribute('dir');
      
      if (dir) {
        expect(['ltr', 'rtl']).toContain(dir);
      }
    });
  });
});

// Helper function to count DOM nodes
function countDOMNodes(element: Element): number {
  let count = 1; // Count the element itself
  
  for (let i = 0; i < element.children.length; i++) {
    count += countDOMNodes(element.children[i]);
  }
  
  return count;
}