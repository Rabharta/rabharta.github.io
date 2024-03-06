const windowTitleStyle = `${
    navigator.platform.includes('Mac')?'macos':'windows'
} ${
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
}`;

const pageWrap = (title, contents) => {
    return h('div', {}, [
        h('div', {className: `ostitlebar ${windowTitleStyle}`}, `An Rabharta Glas - Green Left | ${title}`),
        h('div', {id: 'container'},
            h('div', {id: 'wrapper'}, contents)
        )
    ])
}

const SinglePagePreview = createClass({
    render() {
        const data = this.props.entry.getIn(['data']).toJS();
        const body = this.props.widgetFor('body');

        const contentSection = h('section', {className: 'main style1'}, [
            h('div', {}, h('section', {className: 'main style1'}, [
                h('header', {className: 'small'}, [
                    h('h1', {}, data.title),
                    h('p', {}, data.subtitle)
                ]),
                data.banner ? h('div', {className: 'image filtered', dataPosition: 'center'},
                    h('img', {src: data.banner, alt: data.title})
                ) : null
            ])),
            h('div', {className: 'inner'}, [
                body,
                data.actions ? 
                    h('div', {className: 'inner'}, h('ul', {className: 'actions special'},
                        data.actions.map(item => h('li', {},
                            h('a', {className: 'button next', href: item.link}, item.action)
                        ))
                    )) : null
            ])
        ])

        return pageWrap(data.title, [
            contentSection
        ])
    }
});
const HomepagePreview = createClass({
    render() {
        const data = this.props.entry.getIn(['data']).toJS();
        const body = this.props.widgetFor('body');

        const bannerSection = h('section', {className: 'banner'}, [
            h('div', {className: 'image', dataPosition: 'right'},
                h('img', {src: '/theme/images/banner.jpg'})
            ),
            h('div', {className: 'content'}, [
                h('h1', {style: {whiteSpace: 'pre'}}, data.bannerheading),
                h('h3', {className: 'tagline'}, data.bannersubheading),
                data.banneractions ? 
                    h('ul', {className: 'actions special'},
                        data.banneractions.map(item => h('li', {},
                            h('a', {className: 'button next', href: item.link}, item.action)
                        ))
                    ) : null
            ])
        ]);
        const contentSection = h('section', {className: 'main style1'}, [
            h('div', {},
                h('section', {className: 'main style1'}, [
                    h('header', {className: 'small'}, [
                        h('h1', {}, data.heading),
                        body
                    ]),
                    data.image ? h('div', {class: 'image', dataPosition: 'center'},
                        h('img', {src: data.image, alt: data.heading})
                    ) : null
                ])
            ),
            data.actions ? 
                    h('div', {className: 'inner'}, h('ul', {className: 'actions special'},
                        data.actions.map(item => h('li', {},
                            h('a', {className: 'button next', href: item.link}, item.action)
                        ))
                    )) : null
            ]);

        return pageWrap(data.title, [
            bannerSection,
            contentSection
        ])
    }
});

CMS.registerPreviewStyle('/admin/css/preview.css');
CMS.registerPreviewTemplate('homepage', HomepagePreview);
CMS.registerPreviewTemplate('about', SinglePagePreview);
CMS.registerPreviewTemplate('people', SinglePagePreview);
CMS.registerPreviewTemplate('values', SinglePagePreview);
CMS.registerPreviewTemplate('vision', SinglePagePreview);
CMS.registerPreviewTemplate('blog', SinglePagePreview);
