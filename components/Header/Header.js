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
                <title>MileTrav Everything</title>
                <link rel="stylesheet" href="/asset/css/bootstrap.css" />
                <link rel="stylesheet" href="/asset/css/miletrav.css" />
                <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Kanit" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
            </Head>
        )
    }
}
Header.defaultProps = {
    script: [],
    css: [],
    omise: false,
}

Header.PropTypes = {
    script: PropTypes.array,
    cssStyle: PropTypes.array,
}

