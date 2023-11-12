export default function waitForElm<T extends HTMLElement>(
  selector: string,
): Promise<T> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector) as T | null;

    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      const updatedElement = document.querySelector(selector) as T | null;

      if (updatedElement) {
        resolve(updatedElement);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
