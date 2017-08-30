import React, { Component } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <meta name="application-name" content="Miletrav" />
                <meta name="title" content={this.props.title} />
                <meta name="description" content={this.props.metaDesc} />
                <meta name="keywords" content={this.props.metaKeywords.join(',')} />

                <title>{this.props.title}</title>
                
                <link rel="shortcut icon" href="/asset/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/asset/favicon.ico" type="image/x-icon" />

                <meta property="og:site_name" content="Miletrav" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={this.props.ogTitle} />
                <meta property="og:description" content={this.props.ogDesc} />
                <meta property="og:image" content={this.props.ogImage} />
                <meta property="og:image:secure_url" content={this.props.ogImage} />
                <link rel="stylesheet" href="/asset/css/bootstrap.css" />
                <link rel="stylesheet" href="/asset/css/miletrav.css" />
                <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Kanit|Open+Sans|" />
                {
                    this.props.css.map((css, index) => {
                        return (
                            <link key={index} rel="stylesheet" href={css} />
                        )
                    })
                }
                {
                    this.props.script.map((scriptPath, index) => {
                        return (
                            <script key={index} type="text/javascript" src={scriptPath} />
                        )
                    })
                }
                {
                    this.props.omise && (
                        <script src="https://cdn.omise.co/omise.js.gz" type="text/javascript" />
                    )
                }
                {
                    this.props.omise && (
                        <script>
                            Omise.setPublicKey("pkey_test_58vo1ld9i0xu2nrhe9s")
                        </script>
                    )
                }
                {
                    this.props.pdf && (
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.debug.js" />
                    )
                }
            </Head>
        )
    }
}
Header.defaultProps = {
    script: [],
    css: [],
    omise: false,
    pdf: false,
    title: 'Miletrav - Purely you',
    metaDesc: 'Unforgettable day begins with Miletrav. Find adventures nearby or in faraway places and access unique experiences that will passionate your life.',
    metaKeywords: ['recruitment', 'hired', 'hiring', 'team', 'integration'],
    ogTitle: 'Miletrav - Purely you',
    ogDesc: 'Unforgettable day begins with Miletrav. Find adventures nearby or in faraway places and access unique experiences that will passionate your life.',
    ogImage: 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/OG.jpg?alt=media&token=506891bc-21d0-4430-b0c2-20bb065bbd68',
}

Header.PropTypes = {
    script: PropTypes.array,
    cssStyle: PropTypes.array,
}

