const pageWrap = (contents) => {
    return h('div', {id: 'container'},
        h('div', {id: 'wrapper'}, contents)
    )
}

const HomepagePreview = createClass({
    render() {
        const data = this.props.entry.getIn(['data']).toJS();
        const body = this.props.widgetFor('body');

        console.log({
            data
        });

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

        return pageWrap([
            bannerSection,
            contentSection
        ])
    }
});

CMS.registerPreviewStyle('/theme/css/style.css');
CMS.registerPreviewTemplate('homepage', HomepagePreview);
