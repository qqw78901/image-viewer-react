/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

class ImageViewer extends Component {
  static propTypes = {
    // 从0开始
    index: PropTypes.number,
    imgs: PropTypes.arrayOf(PropTypes.string),
    onClose: PropTypes.any,
    visible: PropTypes.bool,
    options: PropTypes.any,
  };
  render() {
    return (
      <div className="ImageViewer">
        {/* <!-- Root element of PhotoSwipe. Must have class pswp. --> */}
        <div
          className="pswp"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          ref={ref => {
            this.el = ref;
          }}
        >
          {/* <!-- Background of PhotoSwipe.
                     It's a separate element as animating opacity is faster than rgba(). --> */}
          <div className="pswp__bg" />

          {/* <!-- Slides wrapper with overflow:hidden. --> */}
          <div className="pswp__scroll-wrap">
            {/* <!-- Container that holds slides.
                         PhotoSwipe keeps only 3 of them in the DOM to save memory.
                         Don't modify these 3 pswp__item elements, data is added later on. --> */}
            <div className="pswp__container">
              <div className="pswp__item" />
              <div className="pswp__item" />
              <div className="pswp__item" />
            </div>

            {/* <!-- Default (PhotoSwipeUIDefault) interface on top of sliding area. Can be changed. --> */}
            <div className="pswp__ui pswp__ui--hidden">
              <div className="pswp__top-bar">
                {/* <!--  Controls are self-explanatory. Order can be changed. --> */}

                <div className="pswp__counter" />

                <button className="pswp__button pswp__button--close" title="关闭" />

                <button className="pswp__button pswp__button--zoom" title="放大/缩小" />

                {/* <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                                 <!-- element will get className pswp__preloader--active when preloader is running --> */}
                <div className="pswp__preloader">
                  <div className="pswp__preloader__icn">
                    <div className="pswp__preloader__cut">
                      <div className="pswp__preloader__donut" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div className="pswp__share-tooltip" />
              </div>

              <button className="pswp__button pswp__button--arrow--left" title="上一张" />

              <button className="pswp__button pswp__button--arrow--right" title="下一张" />

              <div className="pswp__caption">
                <div className="pswp__caption__center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.handleOpen();
    }
  }
  componentDidMount() {
    this.handleOpen();
  }
  handleOpen() {
    const { visible } = this.props;
    // 不使用visible模式时 需要满足visible === 'undefined'
    if (visible || typeof visible === 'undefined') {
      this.open(this.props.index);
    }
  }

  open = (index = 0) => {
    const { imgs = [], options = {} } = this.props;
    if (!imgs.length) return;
    const pswpElement = this.el;
    const items = imgs.map(item => ({
      src: item,
      w: 0,
      h: 0,
    }));
    // define options (if needed)
    const opts = {
      // optionName: 'option value'
      index, // start at first slide
      ...options,
    };

    // Initializes and opens PhotoSwipe
    // console.log(PhotoSwipeUIDefault);

    this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, opts);
    this.gallery.listen('imageLoadComplete', (galleryIndex, item) => {
      if (!item.w || !item.h) {
        const img = new Image();
        img.src = item.src;
        img.onload = () => {
          item.w = img.width;
          item.h = img.height;
          this.gallery.invalidateCurrItems();
          this.gallery.updateSize(true);
        };
      }
    });
    this.gallery.listen('close', () => {
      console.log('close gallery');
    });
    this.gallery.listen('destroy', () => {
      console.log('destroy gallery');
      this.props.onClose();
    });
    this.gallery.init();
  };
}

export default ImageViewer;
