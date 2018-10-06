import React, {Component} from 'react';
import './photoswipe.css';
import './skin.css';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';
class ImageViewer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('render');
        return (
            <div className="ImageViewer">
                {/* <!-- Root element of PhotoSwipe. Must have class pswp. --> */}
                <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref={(ref) => {
                    this.el = ref
                }}>
                    {/* <!-- Background of PhotoSwipe.
                     It's a separate element as animating opacity is faster than rgba(). --> */}
                    <div className="pswp__bg"></div>

                    {/* <!-- Slides wrapper with overflow:hidden. --> */}
                    <div className="pswp__scroll-wrap">

                        {/* <!-- Container that holds slides.
                         PhotoSwipe keeps only 3 of them in the DOM to save memory.
                         Don't modify these 3 pswp__item elements, data is added later on. --> */}
                        <div className="pswp__container">
                            <div className="pswp__item"></div>
                            <div className="pswp__item"></div>
                            <div className="pswp__item"></div>
                        </div>

                        {/* <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. --> */}
                        <div className="pswp__ui pswp__ui--hidden">

                            <div className="pswp__top-bar">

                                {/* <!--  Controls are self-explanatory. Order can be changed. --> */}

                                <div className="pswp__counter"></div>

                                <button className="pswp__button pswp__button--close" title="关闭"></button>

                                <button className="pswp__button pswp__button--zoom" title="放大/缩小"></button>

                                {/* <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                                 <!-- element will get className pswp__preloader--active when preloader is running --> */}
                                <div className="pswp__preloader">
                                    <div className="pswp__preloader__icn">
                                        <div className="pswp__preloader__cut">
                                            <div className="pswp__preloader__donut"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                <div className="pswp__share-tooltip"></div>
                            </div>

                            <button className="pswp__button pswp__button--arrow--left" title="上一张">
                            </button>

                            <button className="pswp__button pswp__button--arrow--right" title="下一张">
                            </button>

                            <div className="pswp__caption">
                                <div className="pswp__caption__center"></div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps,nextState);
    //     return true;
    // }
    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps');
    //     if (nextProps.visible !== this.props.visible) {
    //         console.log('open');
    //         // if(nextProps.visible==true){
    //         //     this.open(nextProps.index);
    //         // }else{
    //         //     this.open(nextProps.index);
    //         // }
    //     }
    // }

    componentDidMount() {
        console.log("mounted image-viewer");
        this.open(this.props.index);
    }

    open = (index) => {
        const {imgs} = this.props;
        let pswpElement = this.el;
        const items = imgs.map(item => {
            return {
                src: item,
                w: 0,
                h: 0
            };
        });
        // define options (if needed)
        let options = {
            // optionName: 'option value'
            index: index || 0 // start at first slide
        };

        // Initializes and opens PhotoSwipe
        console.log(PhotoSwipeUI_Default);

        this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        this.gallery.listen('imageLoadComplete', (galleryIndex, item) => {
            if (!item.w || !item.h) {
                let img = new Image();
                img.src = item.src;
                img.onload = () => {
                    item.w = img.width;
                    item.h = img.height;
                    this.gallery.invalidateCurrItems();
                    this.gallery.updateSize(true);
                }
            }
        });
        this.gallery.listen('close', () => {
            console.log('close gallery');


        })
        this.gallery.listen('destroy', () => {
            console.log('destroy gallery');
            this.props.onClose();
        })
        this.gallery.init();
    }
}

export default ImageViewer;
  