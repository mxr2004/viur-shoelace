import {
  component_styles_default
} from "./chunk.G466JWVF.js";
import {
  e,
  i,
  n as n2
} from "./chunk.JPCNAH5U.js";
import {
  n,
  r,
  y
} from "./chunk.X3WLUTHF.js";
import {
  __decorateClass
} from "./chunk.IHGPZX35.js";

// src/components/slider/slider.styles.ts
var slider_styles_default = r`
  ${component_styles_default}

  :host {
    display: block;
    --slider-dot-color:rgb(var(--sl-color-primary-600));
    --slider-arrow-color:rgb(var(--sl-color-primary-600));
    --slider-arrow-color-hover:rgb(var(--sl-color-primary-300));
  }

  .glider-contain {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .glider {
    margin: 0 auto;
    position: relative;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    transform: translateZ(0);
  }
  .glider-track {
    transform: translateZ(0);
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    z-index: 1;
  }
  .glider.draggable {
    user-select: none;
    cursor: -webkit-grab;
    cursor: grab;
  }
  .glider.draggable .glider-slide img {
    user-select: none;
    pointer-events: none;
  }
  .glider.drag {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .glider-slide {
    user-select: none;
    justify-content: center;
    align-content: center;
    width: 100%;
  }
  .glider-slide img {
    max-width: 100%;
  }
  .glider::-webkit-scrollbar {
    opacity: 0;
    height: 0;
  }
  .glider-prev,.glider-next {
    user-select: none;
    position: absolute;
    outline: none;
    background: none;
    padding: 0;
    z-index: 2;
    font-size: 40px;
    text-decoration: none;
    left: -23px;
    border: 0;
    top: calc(50% - 56px);
    cursor: pointer;

    opacity: 1;
    line-height: 1;
    transition: opacity .5s cubic-bezier(.17,.67,.83,.67),
                color .5s cubic-bezier(.17,.67,.83,.67);
  }
  .glider-prev::part(base),.glider-next::part(base) {
     color: var(--slider-arrow-color);
  }


  .glider-prev::part(base):hover,
  .glider-next::part(base):hover {
    color: var(--slider-arrow-color-hover);
  }
  .glider-next {
    right: -23px;
    left: auto;
  }
  .glider-next.disabled,
  .glider-prev.disabled {
    opacity: .25;
    color: #666;
    cursor: default;
  }
  .glider-slide {
    min-width: 150px;
  }
  .glider-hide {
    opacity: 0;
  }
  .glider-dots {
    user-select: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    padding: 0;
  }
  .glider-dot {
    border: 0;
    padding: 0;
    user-select: none;
    outline: none;
    display: block;
    cursor: pointer;
    color: rgb(var(--sl-color-neutral-300));
    border-radius: 999px;
    background: rgb(var(--sl-color-neutral-300));;
    width: 12px;
    height: 12px;
    margin: 7px;
  }
  .glider-dot:hover,
  .glider-dot.active {
    background: var(--slider-dot-color);
  }
  @media(max-width: 36em){
    .glider::-webkit-scrollbar {
      opacity: 1;
      -webkit-appearance: none;
      width: 7px;
      height: 3px;
    }
    .glider::-webkit-scrollbar-thumb {
      opacity: 1;
      border-radius: 99px;
      background-color: rgb(var(--sl-color-neutral-200));;
      box-shadow: 0 0 1px rgb(var(--sl-color-neutral-200));;
    }
  }


`;

// src/components/slider/glider.js
(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : typeof exports === "object" ? module.exports = factory() : factory();
})(function() {
  "use strict";
  var _window = typeof window !== "undefined" ? window : this;
  var Glider = _window.Glider = function(element, settings) {
    var _ = this;
    if (element._glider)
      return element._glider;
    _.ele = element;
    _.ele.classList.add("glider");
    _.ele._glider = _;
    _.opt = Object.assign({}, {
      slidesToScroll: 1,
      slidesToShow: 1,
      resizeLock: true,
      duration: 0.5,
      easing: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
      }
    }, settings);
    _.animate_id = _.page = _.slide = 0;
    _.arrows = {};
    _._opt = _.opt;
    if (_.opt.skipTrack) {
      _.track = _.ele.children[0];
    } else {
      _.track = document.createElement("div");
      _.ele.appendChild(_.track);
      while (_.ele.children.length !== 1) {
        _.track.appendChild(_.ele.children[0]);
      }
    }
    _.track.classList.add("glider-track");
    _.init();
    _.resize = _.init.bind(_, true);
    _.event(_.ele, "add", {
      scroll: _.updateControls.bind(_)
    });
    _.event(_window, "add", {
      resize: _.resize
    });
  };
  var gliderPrototype = Glider.prototype;
  gliderPrototype.init = function(refresh, paging) {
    var _ = this;
    var width = 0;
    var height = 0;
    var childs = _.track.querySelector("slot").assignedNodes({ flatten: true });
    _.slides = Array.prototype.filter.call(childs, (node) => node.nodeType == Node.ELEMENT_NODE);
    [].forEach.call(_.slides, function(_2, i2) {
      _2.classList.add("glider-slide");
      _2.setAttribute("data-gslide", i2);
    });
    _.containerWidth = _.ele.clientWidth;
    var breakpointChanged = _.settingsBreakpoint();
    if (!paging)
      paging = breakpointChanged;
    if (_.opt.slidesToShow === "auto" || typeof _.opt._autoSlide !== "undefined") {
      var slideCount = _.containerWidth / _.opt.itemWidth;
      _.opt._autoSlide = _.opt.slidesToShow = _.opt.exactWidth ? slideCount : Math.max(1, Math.floor(slideCount));
    }
    if (_.opt.slidesToScroll === "auto") {
      _.opt.slidesToScroll = Math.floor(_.opt.slidesToShow);
    }
    _.itemWidth = _.opt.exactWidth ? _.opt.itemWidth : _.containerWidth / _.opt.slidesToShow;
    [].forEach.call(_.slides, function(__) {
      __.style.height = "auto";
      __.style.width = _.itemWidth + "px";
      width += _.itemWidth;
      height = Math.max(__.offsetHeight, height);
    });
    _.track.style.width = width + "px";
    _.trackWidth = width;
    _.isDrag = false;
    _.preventClick = false;
    _.opt.resizeLock && _.scrollTo(_.slide * _.itemWidth, 0);
    if (breakpointChanged || paging) {
      _.bindArrows();
      _.buildDots();
      _.bindDrag();
    }
    _.updateControls();
    _.emit(refresh ? "refresh" : "loaded");
  };
  gliderPrototype.bindDrag = function() {
    var _ = this;
    _.mouse = _.mouse || _.handleMouse.bind(_);
    var mouseup = function() {
      _.mouseDown = void 0;
      _.ele.classList.remove("drag");
      if (_.isDrag) {
        _.preventClick = true;
      }
      _.isDrag = false;
    };
    var events = {
      mouseup,
      mouseleave: mouseup,
      mousedown: function(e2) {
        e2.preventDefault();
        e2.stopPropagation();
        _.mouseDown = e2.clientX;
        _.ele.classList.add("drag");
      },
      mousemove: _.mouse,
      click: function(e2) {
        if (_.preventClick) {
          e2.preventDefault();
          e2.stopPropagation();
        }
        _.preventClick = false;
      }
    };
    _.ele.classList.toggle("draggable", _.opt.draggable === true);
    _.event(_.ele, "remove", events);
    if (_.opt.draggable)
      _.event(_.ele, "add", events);
  };
  gliderPrototype.buildDots = function() {
    var _ = this;
    if (!_.opt.dots) {
      if (_.dots)
        _.dots.innerHTML = "";
      return;
    }
    if (typeof _.opt.dots === "string") {
      _.dots = _.ele.parentNode.querySelector(_.opt.dots);
    } else
      _.dots = _.opt.dots;
    if (!_.dots)
      return;
    _.dots.innerHTML = "";
    _.dots.classList.add("glider-dots");
    for (var i2 = 0; i2 < Math.ceil(_.slides.length / _.opt.slidesToShow); ++i2) {
      var dot = document.createElement("button");
      dot.dataset.index = i2;
      dot.setAttribute("aria-label", "Page " + (i2 + 1));
      dot.setAttribute("role", "tab");
      dot.className = "glider-dot " + (i2 ? "" : "active");
      _.event(dot, "add", {
        click: _.scrollItem.bind(_, i2, true)
      });
      _.dots.appendChild(dot);
    }
  };
  gliderPrototype.bindArrows = function() {
    var _ = this;
    if (!_.opt.arrows) {
      Object.keys(_.arrows).forEach(function(direction) {
        var element = _.arrows[direction];
        _.event(element, "remove", { click: element._func });
      });
      return;
    }
    ["prev", "next"].forEach(function(direction) {
      var arrow = _.opt.arrows[direction];
      if (arrow) {
        if (typeof arrow === "string")
          arrow = _.ele.parentNode.querySelector(arrow);
        if (arrow) {
          arrow._func = arrow._func || _.scrollItem.bind(_, direction);
          _.event(arrow, "remove", {
            click: arrow._func
          });
          _.event(arrow, "add", {
            click: arrow._func
          });
          _.arrows[direction] = arrow;
        }
      }
    });
  };
  gliderPrototype.updateControls = function(event) {
    var _ = this;
    if (event && !_.opt.scrollPropagate) {
      event.stopPropagation();
    }
    var disableArrows = _.containerWidth >= _.trackWidth;
    if (!_.opt.rewind) {
      if (_.arrows.prev) {
        _.arrows.prev.classList.toggle("disabled", _.ele.scrollLeft <= 0 || disableArrows);
        _.arrows.prev.classList.contains("disabled") ? _.arrows.prev.setAttribute("aria-disabled", true) : _.arrows.prev.setAttribute("aria-disabled", false);
      }
      if (_.arrows.next) {
        _.arrows.next.classList.toggle("disabled", Math.ceil(_.ele.scrollLeft + _.containerWidth) >= Math.floor(_.trackWidth) || disableArrows);
        _.arrows.next.classList.contains("disabled") ? _.arrows.next.setAttribute("aria-disabled", true) : _.arrows.next.setAttribute("aria-disabled", false);
      }
    }
    _.slide = Math.round(_.ele.scrollLeft / _.itemWidth);
    _.page = Math.round(_.ele.scrollLeft / _.containerWidth);
    var middle = _.slide + Math.floor(Math.floor(_.opt.slidesToShow) / 2);
    var extraMiddle = Math.floor(_.opt.slidesToShow) % 2 ? 0 : middle + 1;
    if (Math.floor(_.opt.slidesToShow) === 1) {
      extraMiddle = 0;
    }
    if (_.ele.scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)) {
      _.page = _.dots ? _.dots.children.length - 1 : 0;
    }
    [].forEach.call(_.slides, function(slide, index) {
      var slideClasses = slide.classList;
      var wasVisible = slideClasses.contains("visible");
      var start = _.ele.scrollLeft;
      var end = _.ele.scrollLeft + _.containerWidth;
      var itemStart = _.itemWidth * index;
      var itemEnd = itemStart + _.itemWidth;
      [].forEach.call(slideClasses, function(className) {
        /^left|right/.test(className) && slideClasses.remove(className);
      });
      slideClasses.toggle("active", _.slide === index);
      if (middle === index || extraMiddle && extraMiddle === index) {
        slideClasses.add("center");
      } else {
        slideClasses.remove("center");
        slideClasses.add([
          index < middle ? "left" : "right",
          Math.abs(index - (index < middle ? middle : extraMiddle || middle))
        ].join("-"));
      }
      var isVisible = Math.ceil(itemStart) >= Math.floor(start) && Math.floor(itemEnd) <= Math.ceil(end);
      slideClasses.toggle("visible", isVisible);
      if (isVisible !== wasVisible) {
        _.emit("slide-" + (isVisible ? "visible" : "hidden"), {
          slide: index
        });
      }
    });
    if (_.dots) {
      [].forEach.call(_.dots.children, function(dot, index) {
        dot.classList.toggle("active", _.page === index);
      });
    }
    if (event && _.opt.scrollLock) {
      clearTimeout(_.scrollLock);
      _.scrollLock = setTimeout(function() {
        clearTimeout(_.scrollLock);
        if (Math.abs(_.ele.scrollLeft / _.itemWidth - _.slide) > 0.02) {
          if (!_.mouseDown) {
            if (_.trackWidth > _.containerWidth + _.ele.scrollLeft) {
              _.scrollItem(_.getCurrentSlide());
            }
          }
        }
      }, _.opt.scrollLockDelay || 250);
    }
  };
  gliderPrototype.getCurrentSlide = function() {
    var _ = this;
    return _.round(_.ele.scrollLeft / _.itemWidth);
  };
  gliderPrototype.scrollItem = function(slide, dot, e2) {
    if (e2)
      e2.preventDefault();
    var _ = this;
    var originalSlide = slide;
    ++_.animate_id;
    if (dot === true) {
      slide = slide * _.containerWidth;
      slide = Math.round(slide / _.itemWidth) * _.itemWidth;
    } else {
      if (typeof slide === "string") {
        var backwards = slide === "prev";
        if (_.opt.slidesToScroll % 1 || _.opt.slidesToShow % 1) {
          slide = _.getCurrentSlide();
        } else {
          slide = _.slide;
        }
        if (backwards)
          slide -= _.opt.slidesToScroll;
        else
          slide += _.opt.slidesToScroll;
        if (_.opt.rewind) {
          var scrollLeft = _.ele.scrollLeft;
          slide = backwards && !scrollLeft ? _.slides.length : !backwards && scrollLeft + _.containerWidth >= Math.floor(_.trackWidth) ? 0 : slide;
        }
      }
      slide = Math.max(Math.min(slide, _.slides.length), 0);
      _.slide = slide;
      slide = _.itemWidth * slide;
    }
    _.scrollTo(slide, _.opt.duration * Math.abs(_.ele.scrollLeft - slide), function() {
      _.updateControls();
      _.emit("animated", {
        value: originalSlide,
        type: typeof originalSlide === "string" ? "arrow" : dot ? "dot" : "slide"
      });
    });
    return false;
  };
  gliderPrototype.settingsBreakpoint = function() {
    var _ = this;
    var resp = _._opt.responsive;
    if (resp) {
      resp.sort(function(a, b) {
        return b.breakpoint - a.breakpoint;
      });
      for (var i2 = 0; i2 < resp.length; ++i2) {
        var size = resp[i2];
        if (_window.innerWidth >= size.breakpoint) {
          if (_.breakpoint !== size.breakpoint) {
            _.opt = Object.assign({}, _._opt, size.settings);
            _.breakpoint = size.breakpoint;
            return true;
          }
          return false;
        }
      }
    }
    var breakpointChanged = _.breakpoint !== 0;
    _.opt = Object.assign({}, _._opt);
    _.breakpoint = 0;
    return breakpointChanged;
  };
  gliderPrototype.scrollTo = function(scrollTarget, scrollDuration, callback) {
    var _ = this;
    var start = new Date().getTime();
    var animateIndex = _.animate_id;
    var animate = function() {
      var now = new Date().getTime() - start;
      _.ele.scrollLeft = _.ele.scrollLeft + (scrollTarget - _.ele.scrollLeft) * _.opt.easing(0, now, 0, 1, scrollDuration);
      if (now < scrollDuration && animateIndex === _.animate_id) {
        _window.requestAnimationFrame(animate);
      } else {
        _.ele.scrollLeft = scrollTarget;
        callback && callback.call(_);
      }
    };
    _window.requestAnimationFrame(animate);
  };
  gliderPrototype.removeItem = function(index) {
    var _ = this;
    if (_.slides.length) {
      _.track.querySelector("slot").removeChild(_.slides[index]);
      _.refresh(true);
      _.emit("remove");
    }
  };
  gliderPrototype.addItem = function(ele) {
    var _ = this;
    _.track.querySelector("slot").appendChild(ele);
    _.refresh(true);
    _.emit("add");
  };
  gliderPrototype.handleMouse = function(e2) {
    var _ = this;
    if (_.mouseDown) {
      _.isDrag = true;
      _.ele.scrollLeft += (_.mouseDown - e2.clientX) * (_.opt.dragVelocity || 3.3);
      _.mouseDown = e2.clientX;
    }
  };
  gliderPrototype.round = function(double) {
    var _ = this;
    var step = _.opt.slidesToScroll % 1 || 1;
    var inv = 1 / step;
    return Math.round(double * inv) / inv;
  };
  gliderPrototype.refresh = function(paging) {
    var _ = this;
    _.init(true, paging);
  };
  gliderPrototype.setOption = function(opt, global) {
    var _ = this;
    if (_.breakpoint && !global) {
      _._opt.responsive.forEach(function(v) {
        if (v.breakpoint === _.breakpoint) {
          v.settings = Object.assign({}, v.settings, opt);
        }
      });
    } else {
      _._opt = Object.assign({}, _._opt, opt);
    }
    _.breakpoint = 0;
    _.settingsBreakpoint();
  };
  gliderPrototype.destroy = function() {
    var _ = this;
    var replace = _.ele.cloneNode(true);
    var clear = function(ele) {
      ele.removeAttribute("style");
      [].forEach.call(ele.classList, function(className) {
        /^glider/.test(className) && ele.classList.remove(className);
      });
    };
    replace.children[0].outerHTML = replace.children[0].innerHTML;
    clear(replace);
    [].forEach.call(replace.getElementsByTagName("*"), clear);
    _.ele.parentNode.replaceChild(replace, _.ele);
    _.event(_window, "remove", {
      resize: _.resize
    });
    _.emit("destroy");
  };
  gliderPrototype.emit = function(name, arg) {
    var _ = this;
    var e2 = new _window.CustomEvent("glider-" + name, {
      bubbles: !_.opt.eventPropagate,
      detail: arg
    });
    _.ele.dispatchEvent(e2);
  };
  gliderPrototype.event = function(ele, type, args) {
    var eventHandler = ele[type + "EventListener"].bind(ele);
    Object.keys(args).forEach(function(k) {
      eventHandler(k, args[k]);
    });
  };
  return Glider;
});
var glider_default = window.Glider;

// src/components/slider/slider.ts
var SlSlider = class extends n {
  constructor() {
    super(...arguments);
    this.arrows = true;
    this.dots = true;
    this.slidesToShow = 1;
    this.itemWidth = void 0;
    this.duration = 0.5;
    this.draggable = true;
    this.scrollLock = true;
    this.resizeLock = true;
    this.rewind = true;
    this.autoScroll = 0;
    this.baseOptions = {};
    this.gliderInstance = null;
    this.interval = null;
  }
  collectOtions() {
    if (this.arrows) {
      Object.assign(this.baseOptions, { "arrows": {
        prev: ".prev",
        next: ".next"
      } });
    }
    if (this.dots) {
      Object.assign(this.baseOptions, { "dots": ".dots" });
    }
    Object.assign(this.baseOptions, {
      "slidesToShow": this.slidesToShow === 0 ? "auto" : this.slidesToShow,
      "slidesToScroll": this.slidesToShow === 0 ? 1 : this.slidesToShow,
      "draggable": this.draggable,
      "duration": this.duration,
      "scrollLock": this.scrollLock,
      "resizeLock": this.resizeLock,
      "rewind": this.rewind,
      "itemWidth": this.itemWidth
    });
  }
  startAutoScroll() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.autoScroll !== 0 && this.rewind) {
      this.interval = setInterval(() => {
        if (this.gliderInstance) {
          this.gliderInstance.scrollItem("next");
        }
      }, this.autoScroll);
    }
  }
  hasChanged() {
    if (this.gliderInstance) {
      this.gliderInstance.destroy();
    }
    this.collectOtions();
    this.gliderInstance = new glider_default(this.gliderWrapper, this.baseOptions);
    this.startAutoScroll();
  }
  handleSlotChange() {
    this.collectOtions();
    this.gliderInstance = new glider_default(this.gliderWrapper, this.baseOptions);
    this.startAutoScroll();
  }
  render() {
    return y`
      <div class="glider-contain">
        <div part="base" class="glider">
          <slot @slotchange=${this.handleSlotChange}>
          </slot>
        </div>

        <sl-icon-button part="previous-button" aria-label="Previous" class="prev glider-prev" name="arrow-left"></sl-icon-button>
        <sl-icon-button part="next-button" aria-label="Next" class="next glider-next" name="arrow-right"></sl-icon-button>

        <div part="dots" role="tablist" class="dots"></div>
      </div>
    `;
  }
};
SlSlider.styles = slider_styles_default;
__decorateClass([
  i(".glider")
], SlSlider.prototype, "gliderWrapper", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSlider.prototype, "arrows", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSlider.prototype, "dots", 2);
__decorateClass([
  e({ type: Number, reflect: true })
], SlSlider.prototype, "slidesToShow", 2);
__decorateClass([
  e({ type: Number, reflect: true })
], SlSlider.prototype, "itemWidth", 2);
__decorateClass([
  e({ type: Number, reflect: true })
], SlSlider.prototype, "duration", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSlider.prototype, "draggable", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSlider.prototype, "scrollLock", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSlider.prototype, "resizeLock", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSlider.prototype, "rewind", 2);
__decorateClass([
  e({ type: Number, reflect: true })
], SlSlider.prototype, "autoScroll", 2);
SlSlider = __decorateClass([
  n2("sl-slider")
], SlSlider);
var slider_default = SlSlider;

export {
  slider_default
};
/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/
