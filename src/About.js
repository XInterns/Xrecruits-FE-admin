import React, { Component } from 'react';
import './index.css';
import './About.css';
export default class Header extends Component {
    render() {
        return (
            <section class="about" id="about">
            <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                <h1 class="section-heading text-uppercase">About us</h1>
                <h3 class="section-subsubheading">Xebia explores and creates new frontiers. Always one step ahead of what businesses need, we turn the latest technology trends into advantages for our customers. As a mainstream frontrunner, we create new solutions and build the future with our clients.
            An international network of passionate technologists and pioneering craftsmen, Xebia provides the cutting-edge tools, training and consulting services that make businesses work better, smarter, and faster.</h3>
                <h2 class="section-subheading text-uppercase">Xebia group</h2>
                <h3 class="section-subsubheading">Xebia Group consists of seven specialized, interlinked companies: Xebia, Xebia Academy, XebiaLabs, StackState, GoDataDriven, Xpirit and Binx.io. With offices in Amsterdam and Hilversum (Netherlands), Paris, Delhi, Bangalore and Boston, we employ over 700 people worldwide. In 2016, we generated 77 million in revenue. </h3>
                <h3 class="section-subsubheading">Our services and product solutions address digital strategy; agile transformations; DevOps and continuous delivery; big data and data science; cloud infrastructures; agile software development; quality and test automation; and agile software security. </h3>
                </div>
            </div>
            </div>
            </section>
        )
}
}
