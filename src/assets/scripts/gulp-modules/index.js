/**
 * Linear interpolation
 * @param {Number} a - first value to interpolate
 * @param {Number} b - second value to interpolate
 * @param {Number} n - amount to interpolate
 */
const lerp = (a, b, n) => (1 - n) * a + n * b;

/**
 * Gets the cursor position
 * @param {Event} ev - mousemove event
 */
const getCursorPos = ev => {
  return {
    x: ev.clientX,
    y: ev.clientY,
  };
};

/**
 * Preload images
 * @param {String} selector - Selector/scope from where images need to be preloaded. Default is 'img'
 */
const preloadImages = (selector = 'img') => {
  return new Promise(resolve => {
    imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
  });
};

/**
 * Wraps the elements of an array.
 * @param {Array} arr - the array of elements to be wrapped
 * @param {String} wrapType - the type of the wrap element ('div', 'span' etc)
 * @param {String} wrapClass - the wrap class(es)
 */
const wrapLines = (arr, wrapType, wrapClass) => {
  arr.forEach(el => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    el.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(el);
  });
};

/**
 * Checks if an element is in the viewport
 * @param {Element} elem - the element to be checked
 */
const isInViewport = elem => {
  var bounding = elem.getBoundingClientRect();
  return (
    ((bounding.bottom >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) ||
      (bounding.top >= 0 &&
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight))) &&
    ((bounding.right >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)) ||
      (bounding.left >= 0 &&
        bounding.left <= (window.innerWidth || document.documentElement.clientWidth)))
  );
};

/**
 * Class representing a text line element that reveals itself by animating its translateY value
 */
class TextLinesReveal {
  // DOM elements
  DOM = {
    // main element (a text DOM element)
    el: null,
  };
  // Split Type instance
  SplitTypeInstance;
  // Checks if the Split Type lines are visible or not
  isVisible;
  // Animation timelines
  inTimeline;
  outTimeline;

  /**
   * Constructor.
   * @param {Element} DOM_el - a text DOM element
   */
  constructor(DOM_el) {
    this.DOM = {
      el: DOM_el,
    };

    this.SplitTypeInstance = new SplitType(this.DOM.el, { types: 'lines' });
    // Wrap the lines (div with class .oh)
    // The inner child will be the one animating the transform
    wrapLines(this.SplitTypeInstance.lines, 'div', 'oh');

    this.initEvents();
  }

  /**
   * Animates the lines in.
   * @return {GSAP Timeline} the animation timeline
   * @param {Boolean} animation - with or without animation.
   */
  in(animation = true) {
    // Lines are visible
    this.isVisible = true;

    gsap.killTweensOf(this.SplitTypeInstance.lines);
    this.inTimeline = gsap
      .timeline({
        defaults: {
          duration: 1.5,
          ease: 'power4.inOut',
        },
      })
      .addLabel('start', 0)
      .set(
        this.SplitTypeInstance.lines,
        {
          yPercent: 105,
        },
        'start',
      );

    if (animation) {
      this.inTimeline.to(
        this.SplitTypeInstance.lines,
        {
          yPercent: 0,
          stagger: 0.1,
        },
        'start',
      );
    } else {
      this.inTimeline.set(
        this.SplitTypeInstance.lines,
        {
          yPercent: 0,
        },
        'start',
      );
    }

    return this.inTimeline;
  }

  /**
   * Animates the lines out.
   * @param {Boolean} animation - with or without animation.
   * @return {GSAP Timeline} the animation timeline
   */
  out(animation = true) {
    // Lines are invisible
    this.isVisible = false;

    gsap.killTweensOf(this.SplitTypeInstance.lines);

    this.outTimeline = gsap
      .timeline({
        defaults: {
          duration: 1.5,
          ease: 'power4.inOut',
        },
      })
      .addLabel('start', 0);

    if (animation) {
      this.outTimeline.to(
        this.SplitTypeInstance.lines,
        {
          yPercent: -105,
          stagger: 0.02,
        },
        'start',
      );
    } else {
      this.outTimeline.set(
        this.SplitTypeInstance.lines,
        {
          yPercent: -105,
        },
        'start',
      );
    }

    return this.outTimeline;
  }

  /**
   * Initializes some events.
   */
  initEvents() {
    // Re-initialize the Split Text on window resize.
    window.addEventListener('resize', () => {
      // Re-split text
      // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
      this.SplitTypeInstance.split();

      // Need to wrap again the new lines elements (div with class .oh)
      wrapLines(this.SplitTypeInstance.lines, 'div', 'oh');

      // Hide the lines
      if (!this.isVisible) {
        gsap.set(this.SplitTypeInstance.lines, { yPercent: -105 });
      }
    });
  }
}
/**
 * Class representing a Content element (.content)
 */
class Content {
  // DOM elements
  DOM = {
    // main element (.content)
    el: null,
    // title element (.content__title)
    title: null,
    // inner title elements (.content__title .oh__inner)
    titleInner: null,
    // inner meta element (.content__meta .oh__inner)
    metaInner: null,
    // text element (.content__text)
    text: null,
    // thumbs (.content__thumbs-item)
    thumbs: null,
  };

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.content)
   */
  constructor(DOM_el) {
    this.DOM.el = DOM_el;
    this.DOM.title = this.DOM.el.querySelector('.content__title');
    this.DOM.titleInner = [...this.DOM.title.querySelectorAll('.oh__inner')];
    this.DOM.metaInner = this.DOM.el.querySelector('.content__meta > .oh__inner');
    this.DOM.text = this.DOM.el.querySelector('.content__text');
    this.multiLine = new TextLinesReveal(this.DOM.text);
    this.DOM.thumbs = [...this.DOM.el.querySelectorAll('.content__thumbs-item')];
  }
}
/**
 * Class representing a Preview element (.preview)
 */
class Preview {
  // DOM elements
  DOM = {
    // main element (.preview)
    el: null,
    // image wrap element (.preview__img-wrap)
    imageWrap: null,
    // image element (.preview__img)
    image: null,
    // image inner element (.preview__img-inner)
    imageInner: null,
    // title element (.preview__title)
    title: null,
    // inner title elements (.oh__inner)
    titleInner: null,
    // description element (.preview__desc)
    description: null,
  };

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.preview)
   */
  constructor(DOM_el, content_el) {
    this.DOM.el = DOM_el;
    this.content = new Content(content_el);
    this.DOM.imageWrap = this.DOM.el.querySelector('.preview__img-wrap');
    this.DOM.image = this.DOM.imageWrap.querySelector('.preview__img');
    this.DOM.imageInner = this.DOM.image.querySelector('.preview__img-inner');
    this.DOM.title = this.DOM.el.querySelector('.preview__title');
    this.DOM.titleInner = [...this.DOM.title.querySelectorAll('.oh__inner')];
    this.DOM.description = this.DOM.el.querySelector('.preview__desc');
  }
}

const ANIMATION_CONFIG = { duration: 1.5, ease: 'power4.inOut' };

const previewElems = [...document.querySelectorAll('.preview')];
const contentElems = [...document.querySelectorAll('.content')];
const previewItems = [];
previewElems.forEach((item, pos) => {
  previewItems.push(new Preview(item, contentElems[pos]));
});
const backCtrl = document.querySelector('.action--back');

// // Smooth scrolling.
let lenis;
// Current open item's position
let currentItem = -1;

let isAnimating = false;
// const pageInnerRef = document.querySelector('.page__inner');
// const pageInnerContentRef = document.querySelector('.page__content');

const initSmoothScrolling = () => {
  // Smooth scrolling initialization (using Lenis https://github.com/studio-freight/lenis)
  lenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  //get scroll value
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    ScrollTrigger.update();
  });

  const raf = time => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
};

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const animateOnScroll = () => {
  for (const item of previewItems) {
    gsap.set(item.DOM.imageInner, { transformOrigin: '50% 0%' });

    item.scrollTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: item.DOM.el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      .addLabel('start', 0)
      .to(
        item.DOM.title,
        {
          ease: 'none',
          yPercent: -100,
        },
        'start',
      )
      .to(
        item.DOM.imageInner,
        {
          ease: 'none',
          scaleY: 1.8,
        },
        'start',
      );
  }
};

const getAdjacentItems = item => {
  let arr = [];
  for (const [position, otherItem] of previewItems.entries()) {
    if (item != otherItem && isInViewport(otherItem.DOM.el)) {
      arr.push({ position: position, item: otherItem });
    }
  }
  return arr;
};

const showContent = item => {
  // Get adjacent items. Need to hide them.
  const itemIndex = previewItems.indexOf(item);
  const adjacentItems = getAdjacentItems(item);
  item.adjacentItems = adjacentItems;

  const tl = gsap
    .timeline({
      defaults: ANIMATION_CONFIG,
      onStart: () => {
        // Stop the "animate on scroll" timeline for this item
        item.scrollTimeline.pause();
        // Stop the Lenis instance
        lenis.stop();

        // Overflow hidden and pointer events control class
        document.body.classList.add('content-open');
        // Shows current content element
        item.content.DOM.el.classList.add('content--current');

        gsap.set([item.content.DOM.titleInner, item.content.DOM.metaInner], {
          yPercent: -101,
          opacity: 0,
        });
        gsap.set(item.content.DOM.thumbs, {
          transformOrigin: '0% 0%',
          scale: 0,
          yPercent: 150,
        });
        gsap.set([item.content.DOM.text, backCtrl], {
          opacity: 0,
        });

        // Save image current scaleY value
        const scaleY =
          item.DOM.imageInner.getBoundingClientRect().height / item.DOM.imageInner.offsetHeight;
        item.imageInnerScaleYCached = scaleY;
      },
      onComplete: () => (isAnimating = false),
    })
    .addLabel('start', 0);
  // hide adjacent preview elements

  for (const el of item.adjacentItems) {
    tl.to(
      el.item.DOM.el,
      {
        y: el.position < itemIndex ? -window.innerHeight : window.innerHeight,
      },
      'start',
    );
  }

  // gsap Flip logic: move the image element inside the content area
  tl.add(() => {
    const flipstate = Flip.getState(item.DOM.image);
    item.content.DOM.el.appendChild(item.DOM.image);
    Flip.from(flipstate, {
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
      absolute: true,
    });
  }, 'start')
    // preview title
    .to(
      item.DOM.titleInner,
      {
        yPercent: 101,
        opacity: 0,
        stagger: -0.03,
      },
      'start',
    )
    // preview description
    .to(
      item.DOM.description,
      {
        yPercent: 101,
        opacity: 0,
      },
      'start',
    )
    // Reset image scaleY values (changed during scroll)
    .to(
      item.DOM.imageInner,
      {
        scaleY: 1,
      },
      'start',
    )

    // Content elements come in a bit later
    .addLabel('content', 0.15)
    // Back control button
    .to(
      backCtrl,
      {
        opacity: 1,
      },
      'content',
    )
    // content title
    .to(
      item.content.DOM.titleInner,
      {
        yPercent: 0,
        opacity: 1,
        stagger: -0.05,
      },
      'content',
    )
    // content meta / author
    .to(
      item.content.DOM.metaInner,
      {
        yPercent: 0,
        opacity: 1,
      },
      'content',
    )
    // content thumbs
    .to(
      item.content.DOM.thumbs,
      {
        scale: 1,
        yPercent: 0,
        stagger: -0.05,
      },
      'content',
    )
    // content text (lines)
    .add(() => {
      item.content.multiLine.in();

      gsap.set(item.content.DOM.text, {
        opacity: 1,
        delay: 0.01,
      });
    }, 'content');
};

const hideContent = () => {
  // the current open item
  const item = previewItems[currentItem];

  gsap
    .timeline({
      defaults: ANIMATION_CONFIG,
      onComplete: () => {
        // Stop the "animate on scroll" timeline for this item
        //item.scrollTimeline.play();

        // Start the Lenis instance
        lenis.start();

        // Overflow hidden and pointer events control class
        document.body.classList.remove('content-open');
        // Hides current content element
        item.content.DOM.el.classList.remove('content--current');

        isAnimating = false;
      },
    })
    .addLabel('start', 0)
    // Back control button
    .to(
      backCtrl,
      {
        opacity: 0,
      },
      'start',
    )
    // content title
    .to(
      item.content.DOM.titleInner,
      {
        yPercent: -101,
        opacity: 0,
        stagger: 0.05,
      },
      'start',
    )
    // content meta / author
    .to(
      item.content.DOM.metaInner,
      {
        yPercent: -101,
        opacity: 0,
      },
      'start',
    )
    // content thumbs
    .to(
      item.content.DOM.thumbs,
      {
        scale: 0,
        yPercent: 150,
        stagger: -0.05,
      },
      'start',
    )
    // content text (lines)
    .add(() => {
      item.content.multiLine.out();
    }, 'start')

    // Preview elements come in a bit later
    .addLabel('preview', 0.15)
    // hide adjacent preview elements
    .to(
      item.adjacentItems.map(el => el.item.DOM.el),
      {
        y: 0,
      },
      'preview',
    )
    // gsap Flip logic: move the image element inside the content area
    .add(() => {
      const flipstate = Flip.getState(item.DOM.image);
      item.DOM.imageWrap.appendChild(item.DOM.image);
      Flip.from(flipstate, {
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
        absolute: true,
      });
    }, 'preview')
    // preview title
    .to(
      item.DOM.titleInner,
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.03,
      },
      'preview',
    )
    // preview description
    .to(
      item.DOM.description,
      {
        yPercent: 0,
        opacity: 1,
      },
      'preview',
    )
    // Reset image scaleY values
    .to(
      item.DOM.imageInner,
      {
        scaleY: item.imageInnerScaleYCached,
      },
      'preview',
    );
};

// Initialize the events
const initEvents = () => {
  for (const [pos, item] of previewItems.entries()) {
    item.DOM.imageWrap.addEventListener('click', () => {
      if (isAnimating) return;
      isAnimating = true;
      currentItem = pos;
      showContent(item);
    });
  }

  backCtrl.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    hideContent();
  });
};

// Preload images and initialize scrolling animations
preloadImages('.preview__img-inner, .content__thumbs-item').then(_ => {
  document.body.classList.remove('loading');

  initSmoothScrolling();
  animateOnScroll();
  initEvents();
});

const swiper = new Swiper('.preview__img-inner', {
  loop: true,
  keyboard: true,
  spaceBetween: 0,
  initialSlide: 0,
  slidesPerView: 1,
  lazy: true,
  watchSlidesVisibility: true,
  speed: 300,
  breakpoints: {
    1400: {
      loop: false,
    },
    768: {
      spaceBetween: 50,
      autoHeight: true,
    },
    360: {
      spaceBetween: 15,
      autoHeight: true,
    },
  },
});
