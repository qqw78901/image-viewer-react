/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import 'image-viewer-react/style/photoswipe.css';// eslint-disable-line
import 'image-viewer-react/style/skin.css';// eslint-disable-line
import ImageViewer from 'image-viewer-react/src'; // eslint-disable-line

export default class Main extends Component {
  constructor(p) {
    super(p);
    this.state = {
      open: false,
      index: 0,
      list: [
        'https://octodex.github.com/images/saketocat.png',
        'https://octodex.github.com/images/Brennatocat.png',
        'https://octodex.github.com/images/surftocat.png',
        'https://octodex.github.com/images/tentocats.jpg',
      ],
    };
  }

  openPreview = (index = 0) => {
    this.setState({
      open: true,
      index,
    });
  };
  closePreview = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    const { list, open, index } = this.state;
    return (
      <div>
        <ul>
          {list.map((item, idx) => (
            <li key={item} className="list" idx={idx} onClick={this.openPreview.bind(this, idx)}>
              <img src={item} alt={item} />
            </li>
          ))}
        </ul>
        <button onClick={this.openPreview}>打开预览</button>
        {/* {open && <ImageViewer imgs={list} index={2} onClose={this.closePreview} />} */}
        <ImageViewer visible={open} imgs={list} index={index} onClose={this.closePreview} />
      </div>
    );
  }
}
