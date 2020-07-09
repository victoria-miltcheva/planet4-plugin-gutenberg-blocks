import Shepherd from 'shepherd.js';

const backButton = {
  action() {
    return this.back();
  },
  classes: 'btn btn-info editor-tour-back',
  text: 'Back'
};

const nextButton = {
  action() {
    return this.next();
  },
  classes: 'btn btn-primary editor-tour-next',
  text: 'Next',
};

const steps = [
  {
    title: 'The Articles block is now WYSIWYG!',
    text: `<p>Let us help you find the new place of all fields.</p>`,
    buttons: [
      nextButton,
    ]
  },
  {
    title: 'Read more link.',
    text: `Here you can provide the read more link.`,
    attachTo: {
      element: '.block-articles-read-more-link',
      on: 'left'
    },
    buttons: [
      backButton,
      nextButton,
    ],
    id: 'read-more-link'
  },
  {
    text: `Change how many articles are loaded at a time.`,
    attachTo: {
      element: '.block-articles-article-count',
      on: 'left'
    },
    buttons: [
      backButton,
      nextButton,
    ],
    id: 'article-count'
  },
  {
    text: `You can change the load more button in place, just like you would in a button block.`,
    attachTo: {
      element: '.has-selected-ui .article-load-more',
      on: 'right'
    },
    scrollToHandler: () => {
      const el = document.querySelector( '.has-selected-ui .article-load-more' );
      const editorContent = el.closest( '.block-editor-editor-skeleton__content' );
      editorContent.scrollTop = el.offsetTop - 300;
    },
    buttons: [
      backButton,
      nextButton,
    ],
    id: 'load-more-button-text'
  },
  {
    title: `That's all folks!`,
    text: `Congratulations, you now know everything about the block editor. Go forth and create content!`,
    buttons: [
      backButton,
      {
        action() {
          return this.complete();
        },
        classes: 'btn btn-success editor-tour-back',
        text: 'Finish tour',
      }
    ],
  }
];

export const doTour = () => {
  const tour = new Shepherd.Tour( {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
        label: 'Quit tour',
      },
      classes: 'editor-tour block-tour block-articles-tour',
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  } );
  tour.addSteps( steps );

  tour.start();
};
