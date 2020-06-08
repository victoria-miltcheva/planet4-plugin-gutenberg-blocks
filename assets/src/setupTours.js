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
    title: 'Welcome to the Block Editor!',
    text: `<p>It's easy to get lost in all these features.</p>

    <p>So let us show you around...</p>`,
    buttons: [
      nextButton,
    ]
  },
  {
    // title: 'Your Profile',
    text: `Here you can add a profile picture, update your personal information and change your password.`,
    attachTo: {
      element: '.menupop.with-avatar',
      on: 'bottom'
    },
    buttons: [
      backButton,
      nextButton,
    ],
    id: 'account-menu'
  },
  {
    // title: 'The Title',
    text: `<p>Access the document sidebar with the cog wheel.</p>
<p>In this sidebar you can manage most document settings.</p>
`,
    attachTo: {
      element: '.edit-post-header__settings .has-icon',
      on: 'left',
    },
    buttons: [
      backButton,
      nextButton,
    ],
  },
  {
    // title: 'The Title',
    text: 'Set the post title here, will be used to generate the slug.',
    attachTo: {
      element: '#post-title-0, #post-title-1',
      on: 'bottom',
    },
    buttons: [
      backButton,
      nextButton,
    ],
  },
  {
    // title: 'The Slug',
    text: 'After the first save, you can also change the slug separately in the sidebar on the right.',
    attachTo: {
      element: '.editor-post-link',
      on: 'left',
    },
    buttons: [
      backButton,
      nextButton,
    ],
  },
  {
    text: `There are also some fields under the editor.`,
    attachTo: {
      element: 'body',
      on: 'bottom',
    },
    buttons: [
      backButton,
      nextButton,
    ],
  },
  {
    // title: 'Author override',
    text: `Override the displayed author`,
    attachTo: {
      element: '.cmb2-id-p4-author-override',
      on: 'top',
    },
    buttons: [
      backButton,
      nextButton,
    ],
  },
  {
    // title: 'Author override',
    text: `Set the link of your Take Action Boxout block.`,
    attachTo: {
      element: '.cmb2-id-p4-take-action-page',
      on: 'top',
    },
    buttons: [
      backButton,
      nextButton,
    ],
  },
  {
    // title: 'Author override',
    text: `Display other articles in post.`,
    attachTo: {
      element: '.cmb2-id-include-articles',
      on: 'top',
    },
    buttons: [
      backButton,
      nextButton,
    ],
  },
  {
    // title: 'Author override',
    text: `And set a custom background image for the post.`,
    attachTo: {
      element: '.cmb2-id-p4-background-image-override',
      on: 'top',
    },
    buttons: [
      backButton,
      nextButton,
    ],
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

const doTours = () => {
  const tour = new Shepherd.Tour( {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
        label: 'Quit tour',
      },
      classes: 'editor-tour',
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  } );
  tour.addSteps( steps );

  tour.start();
};

export const setupTours = () => {
  document.addEventListener( 'DOMContentLoaded', event => doTours() );
};
