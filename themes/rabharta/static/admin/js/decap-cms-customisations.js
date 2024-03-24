const windowTitleStyle = `${
  navigator.platform.includes('Mac')?'macos':'windows'
} ${
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
}`;

const makePageWrap = (data, hero, contents) => h('div', {}, [
  h('div', {className: `ostitlebar ${windowTitleStyle}`}, `Rabharta | ${data.meta_title || data.title}`),
  h('div', {id: 'container'},
    h('div', {id: 'wrapper'}, [
      hero || null,
      h('section', {className: 'main style1'}, [
        contents
      ])
    ])
  )
]);

const makeActions = (actions) => actions ? h('div', {className: 'inner'},
  h('ul', {className: 'actions special'}, actions.map(item => h('li', {},
    h('a', {className: 'button next', href: item.link}, item.action)
  ))
)) : null

const makeContent = (body, actions) => h('div', {className: 'inner'}, [
  body,
  makeActions(actions)
]);

const makeContentBanner = (title, body, image) => h('div', {}, h('section', {className: 'main style1'}, [
  h('header', {className: 'small'}, [
      h('h1', {}, title),
      h('p', {}, body)
  ]),
  image ? h('div', {className: 'image filtered', dataPosition: 'center'},
      h('img', {src: image, alt: title})
  ) : null
]));

const makeHeroBanner = (title, body, image, actions) => h('section', {className: 'banner'}, [
  h('div', {className: 'image', dataPosition: 'right'},
      h('img', {src: image, alt: title})
  ),
  h('div', {className: 'content'}, [
      h('h1', {style: {whiteSpace: 'pre'}}, title),
      h('h3', {className: 'tagline'}, body),
      actions ? 
          h('ul', {className: 'actions special'},
              actions.map(item => h('li', {},
                  h('a', {className: 'button next', href: item.link}, item.action)
              ))
          ) : null
  ])
]);

const SinglePagePreview = createClass({
  render() {
      const data = this.props.entry.getIn(['data']).toJS();
      const body = this.props.widgetFor('body');

      return makePageWrap(data, null, [
        makeContentBanner(data.title, data.subtitle, data.banner),
        makeContent(body, data.actions)
      ]);
  }
});
const PeoplePagePreview = createClass({
  render() {
    const data = this.props.entry.getIn(['data']).toJS();
    const body = this.props.widgetFor('body');

    return makePageWrap(data, null, [
      makeContentBanner(data.title, data.constituency, data.banner),
      makeContent(body, data.actions)
    ]);
  }
});
const BlogPostPreview = createClass({
  render() {
    const data = this.props.entry.getIn(['data']).toJS();
    const body = this.props.widgetFor('body');

    const date = h('em', {className: 'blogpost-publish-date'}, data.date.toString());
    return makePageWrap(data, null, [
      makeContentBanner(data.title, data.subtitle, data.banner),
      makeContent(body, data.actions)
    ]);
  }
});
const HomepagePreview = createClass({
  render() {
      const data = this.props.entry.getIn(['data']).toJS();
      const body = this.props.widgetFor('body');

      const homepageBanner = makeHeroBanner(
        data.bannerheading,
        data.bannersubheading,
        '/theme/images/banner.jpg',
        data.banneractions
      );
      
      return makePageWrap(data, homepageBanner, [
        makeContentBanner(data.heading, body, data.image),
        makeActions(data.actions)
      ]);
  }
});

CMS.registerPreviewStyle('/admin/css/preview.css');
CMS.registerPreviewTemplate('homepage', HomepagePreview);
CMS.registerPreviewTemplate('about', SinglePagePreview);
CMS.registerPreviewTemplate('people', PeoplePagePreview);
CMS.registerPreviewTemplate('values', SinglePagePreview);
CMS.registerPreviewTemplate('vision', SinglePagePreview);
CMS.registerPreviewTemplate('programme', SinglePagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
