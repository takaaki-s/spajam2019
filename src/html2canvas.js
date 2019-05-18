import React from 'react';
import html2canvas from 'html2canvas';

export default class html2canvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update: 0,
        };
        this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    };

    updateCanvas() {
        for (let i = 1; i < 10; i++) {
            this.setState({ update: i });
        }
    };

    render() {
        const { update } = this.state;
        return (
            <div>
                <span>aaaaaa</span>
                <span>{update}</span>
            </div>
        );
    }
}
