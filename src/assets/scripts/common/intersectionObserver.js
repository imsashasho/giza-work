const options = {
  rootMargin: '-50px',
  threshold: 0,
};

export const intersectionObserver = (selector, onIntersect) => {
  const handleIntersection = (entries) => {
    const { isIntersecting } = entries[0];

    if (isIntersecting) {
      onIntersect && onIntersect();
      observer.disconnect();
    }
  };

  let observer = new IntersectionObserver(handleIntersection, options);
  const target = document.querySelector(selector);
  observer.observe(target);
};
