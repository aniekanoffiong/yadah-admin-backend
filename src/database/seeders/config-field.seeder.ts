import { AppDataSource } from '../data-source';
import { ConfigEntity } from '../../modules/config/config.entity';
import { RolesEnum } from '../../enum/roles.enum';
import { DayOfWeek } from '../../utils/dayOfWeek';
import { ConfigFieldService } from '../../modules/config/config.service';

const heroConfigFields = {
  entityName: 'hero',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'page',
      label: 'Page',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: 'static',
        value: [
          { value: 'home', label: 'Home' },
          { value: 'gallery', label: 'Gallery' },
          { value: 'about', label: 'About' },
          { value: 'contact', label: 'Contact' },
        ]
      }),
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Select the page where this hero content appears',
    },
    {
      fieldName: 'backgroundImage',
      label: 'Background Image',
      fieldType: 'image',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Upload of the background image',
    },
    {
      fieldName: 'title',
      label: 'Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Main title displayed on hero section',
    },
    {
      fieldName: 'subtitle',
      label: 'Subtitle',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ maxLength: 250 }),
      helpText: 'Subtitle or description text',
    },
    {
      fieldName: 'showControls',
      label: 'Show Controls',
      fieldType: 'boolean',
      editable: true,
      displayOrder: 5,
    },
    {
      fieldName: 'volunteerProgramText',
      label: 'Volunteer Program Text',
      fieldType: 'text',
      editable: true,
      displayOrder: 6,
      validationRulesJson: JSON.stringify({ maxLength: 100 }),
      helpText: 'Text for the volunteer program link/button',
    },
    {
      fieldName: 'volunteerProgramLink',
      label: 'Volunteer Program Link',
      fieldType: 'text',
      editable: true,
      displayOrder: 7,
      validationRulesJson: JSON.stringify({ pattern: '^https?://.+$' }),
      helpText: 'Link URL for the volunteer program',
    },
  ]
}

const eventConfigFields = {
  entityName: 'event',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'title',
      label: 'Event Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 150 }),
    },
    {
      fieldName: 'startDate',
      label: 'Start Date',
      fieldType: 'datetime',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'endDate',
      label: 'End Date',
      fieldType: 'datetime',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'location',
      label: 'Location',
      fieldType: 'text',
      editable: true,
      displayOrder: 4,
    },
    {
      fieldName: 'description',
      label: 'Description',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 5,
    },
    {
      fieldName: 'image',
      label: 'Event Image',
      fieldType: 'image',
      editable: true,
      displayOrder: 6,
    },
  ]
}

const pastorConfigFields = {
  entityName: 'pastor',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'name',
      label: 'Pastor Name',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
    },
    {
      fieldName: 'title',
      label: 'Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ maxLength: 100 }),
    },
    {
      fieldName: 'bio',
      label: 'Biography',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ maxLength: 1000 }),
    },
    {
      fieldName: 'profileImage',
      label: 'Profile Image',
      fieldType: 'image',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ pattern: '^https?://.+\\.(jpg|jpeg|png|gif)$' }),
    },
    {
      fieldName: 'isActive',
      label: 'Active Status',
      fieldType: 'boolean',
      editable: true,
      displayOrder: 5,
    }
  ]
}

const galleryItemConfigFields = {
  entityName: 'gallery',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'src',
      label: 'Upload Image',
      fieldType: 'image',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 150 }),
      helpText: 'URL of the image source',
    },
    {
      fieldName: 'alt',
      label: 'Image Alt Text',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ maxLength: 500 }),
      helpText: 'Alternative text for the image',
    },
    {
      fieldName: 'caption',
      label: 'Image Caption',
      fieldType: 'text',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ maxLength: 500 }),
      helpText: 'Caption for the image',
    },
    {
      fieldName: 'date',
      label: 'Date of Image',
      fieldType: 'date',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Date associated with the image',
    },
    {
      fieldName: 'tags',
      label: 'Image Tags',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/tags",
      }),
      editable: true,
      displayOrder: 5,
      multipleOccurrence: true,
      helpText: 'Tags associated with the image',
    }
  ]
}

const storyEntityFields = {
  entityName: 'story',
  fields: [
    {
      fieldName: 'storyTitle',
      label: 'Story Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 9,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Title for the story item',
    },
    {
      fieldName: 'storyContent',
      label: 'Story Content',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 10,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Content for the story item',
    },
  ]
}

const statEntityFields = {
  entityName: 'storyStat',
  multipleOccurrence: true,
  maxOccurrence: 4,
  fields: [
    {
      fieldName: 'text',
      label: 'Story Stat Text',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Content for the story item',
    },
  ]
}

const valueItemEntityFields = {
  entityName: 'valueItem',
  multipleOccurrence: true,
  maxOccurrence: 4,
  fields: [
    {
      fieldName: 'icon',
      label: 'Value Item Icon',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/icons",
      }),
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Icon for the value item',
    },
    {
      fieldName: 'title',
      label: 'Value Item Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Title for the value item',
    },
    {
      fieldName: 'description',
      label: 'Value Item Description',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Description for the value item',
    },
  ]
}

const valuesEntityFields = {
  entityName: 'values',
  fields: [
    {
      fieldName: 'valuesTitle',
      label: 'Value Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Title for the values section',
    },
    {
      fieldName: 'valuesSubtitle',
      label: 'Value Subtitle',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Value subtitle',
    },
  ]
}

const beliefConfigFields = {
  entityName: 'belief',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'title',
      label: 'Belief Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Title for the belief section',
    },
    {
      fieldName: 'content',
      label: 'Belief Content',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true, maxLength: 1000 }),
      helpText: 'Content for the belief section',
    },
  ]
}

const aboutConfigFields = {
  entityName: 'about',
  subEntities: [
    storyEntityFields,
    statEntityFields,
    valuesEntityFields,
    valueItemEntityFields,
  ],
  multipleOccurrence: false,
  fields: [
    {
      fieldName: 'mainTitle',
      label: 'About Main Title',
      fieldType: 'string',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'About main title',
    },
    {
      fieldName: 'highlightedTitle',
      label: 'Highlighted Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Highlighted title for the about section',
    },
    {
      fieldName: 'description',
      label: 'About Description',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Description for the about section',
    },
  ]
}

const contactInfoConfigFields = {
  entityName: 'contact',
  multipleOccurrence: false,
  fields: [
    {
      fieldName: 'title',
      label: 'Contact Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Title for the contact section',
    },
    {
      fieldName: 'subtitle',
      label: 'Contact Subtitle',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Subtitle for the contact section',
    },
    {
      fieldName: 'address',
      label: 'Address',
      fieldType: 'text',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Address for the contact section',
    },
    {
      fieldName: 'email',
      label: 'Contact Email',
      fieldType: 'text',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ required: true, format: 'email' }),
      helpText: 'Email for the contact section',
    },
    {
      fieldName: 'phone',
      label: 'Contact Phone',
      fieldType: 'text',
      editable: true,
      displayOrder: 5,
      validationRulesJson: JSON.stringify({ required: true, format: 'phone' }),
      helpText: 'Phone number for the contact section',
    },
    {
      fieldName: 'socialPlatforms',
      label: 'Social Platforms',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/social-links",
      }),
      editable: true,
      displayOrder: 7,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Select social platforms to display',
      multipleOccurrence: true,
    },
  ]
}

const ctaButtonConfigFields = {
  entityName: 'button',
  multipleOccurrence: true,
  maxOccurrence: 2,
  fields: [
    {
      fieldName: 'icon',
      label: 'CTA Button Icon',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/icons",
      }),
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Icon for the CTA Button',
      multipleOccurrence: true,
      maxOccurrence: 2
    },
    {
      fieldName: 'text',
      label: 'CTA Text',
      fieldType: 'text',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Text for the CTA Button',
    },
    {
      fieldName: 'variant',
      label: 'CTA Button Variant',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: 'static',
        value: [
          { value: 'primary', label: 'Primary Button' },
          { value: 'secondary', label: 'Secondary Button' },
        ]
      }),
      editable: true,
      displayOrder: 5,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Variant for the CTA Button',
    },
  ]
}

const ctaConfigFields = {
  entityName: 'callToAction',
  subEntities: [
    ctaButtonConfigFields,
  ],
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'title',
      label: 'CTA Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Title for the CTA section',
    },
    {
      fieldName: 'subtitle',
      label: 'CTA Subtitle',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Subtitle for the CTA section',
    },
  ]
}

const footerConfigFields = {
  entityName: 'footer',
  multipleOccurrence: false,
  fields: [
    {
      fieldName: 'newletterTitle',
      label: 'Newletter Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Title for the newsletter section',
    },
    {
      fieldName: 'newletterSubtitle',
      label: 'Newsletter Subtitle',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Subtitle for the newsletter section',
    },
    {
      fieldName: 'logoSrc',
      label: 'Logo Image',
      fieldType: 'image',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Url for Logo',
    },
    {
      fieldName: 'logoAlt',
      label: 'Alt Text for Logo',
      fieldType: 'text',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Alternative Text for Logo',
    },
    {
      fieldName: 'description',
      label: 'Footer description',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 5,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Description for footer section',
    },
    {
      fieldName: 'address',
      label: 'Address',
      fieldType: 'text',
      editable: true,
      displayOrder: 6,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 100 }),
      helpText: 'Address for the contact section',
    },
    {
      fieldName: 'email',
      label: 'Contact Email',
      fieldType: 'text',
      editable: true,
      displayOrder: 7,
      validationRulesJson: JSON.stringify({ required: true, format: 'email' }),
      helpText: 'Email for the contact section',
    },
    {
      fieldName: 'phone',
      label: 'Contact Phone',
      fieldType: 'text',
      editable: true,
      displayOrder: 8,
      validationRulesJson: JSON.stringify({ required: true, format: 'phone' }),
      helpText: 'Phone number for the contact section',
    },
    {
      fieldName: 'socialPlatforms',
      label: 'Social Platforms',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/social-links",
      }),
      editable: true,
      displayOrder: 10,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Select social platforms to display',
      multipleOccurrence: true,
    },
    {
      fieldName: 'quickLinks',
      label: 'Quick Links',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/site-links",
      }),
      editable: true,
      displayOrder: 11,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Select site links to display as quick links',
      multipleOccurrence: true,
    },
    {
      fieldName: 'ministriesLinks',
      label: 'Ministries Links',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/site-links",
      }),
      editable: true,
      displayOrder: 12,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Select site links to display for ministries links',
      multipleOccurrence: true,
    },
    {
      fieldName: 'legalLinks',
      label: 'Legal Links',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/site-links",
      }),
      editable: true,
      displayOrder: 13,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Select site links to display as legal links',
      multipleOccurrence: true,
    },
  ]
}

const growInFaithConfigFields = {
  entityName: 'growInFaith',
  multipleOccurrence: false,
  fields: [
    {
      fieldName: 'title',
      label: 'Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Text for Grow in faith section',
    },
    {
      fieldName: 'description',
      label: 'Description',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Description for Grow in faith section',
    },
    {
      fieldName: 'secondDescription',
      label: 'Second Description',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Additional Decription for Grow in faith section',
    },
    {
      fieldName: 'image',
      label: 'Grow in faith Image',
      fieldType: 'image',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Image for Grow in faith section',
    },
    {
      fieldName: 'buttonText',
      label: 'Grow in faith Button Text',
      fieldType: 'text',
      editable: true,
      displayOrder: 5,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Button text for Grow in faith section',
    },
    {
      fieldName: 'ButtonLink',
      label: 'Link for Grow in faith button',
      fieldType: 'text',
      editable: true,
      displayOrder: 6,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Link for Grow in faith button',
    },
  ]
}

const itemTagConfigFields = {
  entityName: 'itemTag',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'label',
      label: 'Item Tag Label',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Label for Item Tag',
    },
    {
      fieldName: 'isActive',
      label: 'Item Tag Active Status',
      fieldType: 'boolean',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Active status for Item Tag',
    }
  ]
}

const ministryActivityConfigFields = {
  entityName: 'acvitivies',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'activityName',
      label: 'Ministry Activities',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Activities for the ministry',
    },
  ]
}

const ministryConfigFields = {
  entityName: 'ministry',
  multipleOccurrence: true,
  subEntities: [
    ministryActivityConfigFields
  ],
  fields: [
    {
      fieldName: 'icon',
      label: 'Item Tag Icon',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/icons",
      }),
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Icon for Item Tag',
    },
    {
      fieldName: 'title',
      label: 'Ministry Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Title for the ministry',
    },
    {
      fieldName: 'description',
      label: 'Ministry Description',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Description of the ministry',
    },
    {
      fieldName: 'scheduledDay',
      label: 'Ministry Scheduled Day',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "static",
        options: Object.values(DayOfWeek).map(day => ({ label: day, value: day })),
      }),
      editable: true,
      displayOrder: 4,
      helpText: 'Scheduled day for the ministry meeting',
    },
    {
      fieldName: 'meetingTime',
      label: 'Ministry Meeting time',
      fieldType: 'time',
      editable: true,
      displayOrder: 5,
      helpText: 'Meeting time for the ministry',
    },
    {
      fieldName: 'location',
      label: 'Ministry Meeting Location',
      fieldType: 'text',
      editable: true,
      displayOrder: 6,
      helpText: 'Meeting Location for the ministry',
    },
    {
      fieldName: 'leader',
      label: 'Ministry Leader',
      fieldType: 'text',
      editable: true,
      displayOrder: 7,
      helpText: 'Current Leader of the ministry',
    },
    {
      fieldName: 'members',
      label: 'Ministry Members',
      fieldType: 'text',
      editable: true,
      displayOrder: 8,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Estimation of number of members in ministry',
    },
  ]
}

const sermonConfigFields = {
  entityName: 'sermon',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'title',
      label: 'Sermon Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Title for the sermon',
    },
    {
      fieldName: 'minister',
      label: 'Minister',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Name of the minister for the sermon',
    },
    {
      fieldName: 'date',
      label: 'Sermon date',
      fieldType: 'date',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Date of the sermon',
    },
    {
      fieldName: 'duration',
      label: 'Sermon duration',
      fieldType: 'text',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Duration of the sermon',
    },
    {
      fieldName: 'image',
      label: 'Image placeholder for sermon',
      fieldType: 'image',
      editable: true,
      displayOrder: 5,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Image placeholder for displaying the sermon',
    },
    {
      fieldName: 'featured',
      label: 'Is Sermon Featured',
      fieldType: 'boolean',
      editable: true,
      displayOrder: 6,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Semon featured?',
    },
    {
      fieldName: 'videoUrl',
      label: 'Video Link for the Sermon (YouTube)',
      fieldType: 'url',
      editable: true,
      displayOrder: 7,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Video link of the sermon on YouTube, for example',
    },
    {
      fieldName: 'label',
      label: 'Sermon Tag',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/tags",
      }),
      editable: true,
      displayOrder: 8,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Tags for the sermon',
      multipleOccurrence: true
    },
  ]
}

const siteLinkConfigFields = {
  entityName: 'siteLink',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'label',
      label: 'Label for Site link',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Label text for Site link',
    },
    {
      fieldName: 'url',
      label: 'Relative URL link for the site link e.g. /about, /contact',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'URL Link for site link',
    },
  ]
}

const socialLinkConfigFields = {
  entityName: 'social',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'icon',
      label: 'Item Tag Icon',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/icons/social",
      }),
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Icon for Social platform',
    },
    {
      fieldName: 'platform',
      label: 'Social Platform Name',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Platform Name for social platform',
    },
    {
      fieldName: 'name',
      label: 'Social Name',
      fieldType: 'text',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Provided Name of the Social platform',
    },
    {
      fieldName: 'url',
      label: 'Link to social platform',
      fieldType: 'url',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Link to the social platform',
    },
  ]
}

const statItemConfigFields = {
  entityName: 'statItem',
  multipleOccurrence: true,
  maxOccurrence: 4,
  fields: [
    {
      fieldName: 'icon',
      label: 'Statistics Icon',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: "dynamic",
        endpoint: "dropdown-list/icons",
      }),
      editable: true,
      displayOrder: 2,
      styling: JSON.stringify({ colSpan: 1 }),
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Icon for Specific statistic',
    },
    {
      fieldName: 'label',
      label: 'Label for Statictic Item',
      fieldType: 'text',
      editable: true,
      displayOrder: 3,
      styling: JSON.stringify({ colSpan: 1 }),
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Label for Statistic Item',
    },
    {
      fieldName: 'number',
      label: 'Statistic Number',
      fieldType: 'text',
      editable: true,
      displayOrder: 4,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Number value of Statistic',
    },
  ]
}

const statisticsConfigFields = {
  entityName: 'statistics',
  multipleOccurrence: true,
  subEntities: [
    statItemConfigFields,
  ],
  fields: [
    {
      fieldName: 'backgroundImage',
      label: 'Background Image',
      fieldType: 'image',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Background Image for Statistics section',
    },
  ]
}

const bankConfigFields = {
  entityName: 'bank_transfer',
  fields: [
    {
      fieldName: 'account_number',
      label: 'Account Number',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      styling: JSON.stringify({ colSpan: 1 }),
      helpText: 'Bank Account Number for Bank Transfer',
    },
    {
      fieldName: 'account_name',
      label: 'Account Name',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      styling: JSON.stringify({ colSpan: 1 }),
      helpText: 'Bank Account Name for Bank Transfer',
    },
    {
      fieldName: 'bank_name',
      label: 'Bank Name',
      fieldType: 'text',
      editable: true,
      displayOrder: 3,
      styling: JSON.stringify({ colSpan: 1 }),
      helpText: 'Bank for Bank Transfer',
    },
    {
      fieldName: 'sort_code',
      label: 'Sort Code',
      fieldType: 'text',
      editable: true,
      displayOrder: 4,
      styling: JSON.stringify({ colSpan: 1 }),
      helpText: 'Sort code for Bank',
    },
  ]
}

const paymentOptionConfigFields = {
  entityName: 'paymentOption',
  authorizations: JSON.stringify({
    create: RolesEnum.SYSTEM_ADMIN,
    delete: RolesEnum.SYSTEM_ADMIN,
    update: RolesEnum.SUPER_ADMIN
  }),
  multipleOccurrence: true,
  subEntities: [
    bankConfigFields
  ],
  fields: [
    {
      fieldName: 'title',
      label: 'Payment Option Title',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: 'dynamic',
        endpoint: 'dropdown-list/payment-options',
      }),
      editable: true,
      updateEditable: false,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Payment Option Title/Type',
    },
    {
      fieldName: 'isEnabled',
      label: 'Is Payment Option Enabled?',
      fieldType: 'boolean',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: 'Payment Option Enabled toggle',
    },
  ]
}

const scheduleProgramConfigFields = {
  entityName: 'scheduledProgram',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'title',
      label: 'Event Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true, minLength: 3, maxLength: 150 }),
    },
    {
      fieldName: 'scheduledDay',
      label: 'Scheduled Day',
      fieldType: 'select',
      optionsJson: JSON.stringify({
        type: 'static',
        value: Object.values(DayOfWeek).map(dayOfWeek => {
          return {value: dayOfWeek, label: dayOfWeek}
        })
      }),
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'startTime',
      label: 'Start Time',
      fieldType: 'time',
      editable: true,
      displayOrder: 3,
      styling: JSON.stringify({ colSpan: 1 }),
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'endTime',
      label: 'End Time',
      fieldType: 'time',
      editable: true,
      displayOrder: 4,
      styling: JSON.stringify({ colSpan: 1 }),
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'location',
      label: 'Location',
      fieldType: 'text',
      editable: true,
      displayOrder: 5,
    },
    {
      fieldName: 'description',
      label: 'Description',
      fieldType: 'textarea',
      editable: true,
      displayOrder: 6,
    },
    {
      fieldName: 'icon',
      label: 'Icon',
      fieldType: 'text',
      editable: true,
      displayOrder: 7,
    },
    {
      fieldName: 'image',
      label: 'Image Upload',
      fieldType: 'image',
      editable: true,
      displayOrder: 8,
    },
  ]
}

const nextStepConfigFields = {
  entityName: 'nextStep',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'title',
      label: 'Next Step Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'subtitle',
      label: 'Next Step Subtitle',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'page',
      label: 'Related Page',
      fieldType: 'text',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: "Related Page for Next Step Section"
    },
  ]
}

const questionNextStepConfigFields = {
  entityName: 'questionNextStep',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'title',
      label: 'Next Step Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'subtitle',
      label: 'Next Step Subtitle',
      fieldType: 'text',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
    },
    {
      fieldName: 'page',
      label: 'Related Page',
      fieldType: 'text',
      editable: true,
      displayOrder: 3,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: "Related Page for Next Step Section"
    },
  ]
}

const watchLiveConfigFields = {
  entityName: 'live',
  multipleOccurrence: true,
  fields: [
    {
      fieldName: 'title',
      label: 'Event Title',
      fieldType: 'text',
      editable: true,
      displayOrder: 1,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: "Title for current Live Event"
    },
    {
      fieldName: 'date',
      label: 'Event Date',
      fieldType: 'date',
      editable: true,
      displayOrder: 2,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: "Date for current Live Event"
    },
    {
      fieldName: 'startTime',
      label: 'Start Time',
      fieldType: 'time',
      editable: true,
      displayOrder: 3,
      styling: JSON.stringify({ colSpan: 1 }),
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: "Start time for current Live Event"
    },
    {
      fieldName: 'endTime',
      label: 'End Time',
      fieldType: 'time',
      editable: true,
      displayOrder: 4,
      styling: JSON.stringify({ colSpan: 1 }),
      helpText: "End time for current Live Event"
    },
    {
      fieldName: 'videoUrl',
      label: 'YouTube Live Video URL',
      fieldType: 'url',
      editable: true,
      displayOrder: 5,
      validationRulesJson: JSON.stringify({ required: true }),
      helpText: "URL for current YouTube Live"
    },
    {
      fieldName: 'featured',
      label: 'Featured',
      fieldType: 'boolean',
      editable: true,
      displayOrder: 6,
      styling: JSON.stringify({ colSpan: 1 }),
      helpText: "Current Featured event"
    },
    {
      fieldName: 'isLive',
      label: 'Currently Live?',
      fieldType: 'boolean',
      editable: true,
      displayOrder: 7,
      styling: JSON.stringify({ colSpan: 1 }),
      helpText: "Is the event currently live?"
    }
  ]
}

const configEntities = [
  heroConfigFields,
  eventConfigFields,
  pastorConfigFields,
  galleryItemConfigFields,
  aboutConfigFields,
  beliefConfigFields,
  contactInfoConfigFields,
  ctaConfigFields,
  footerConfigFields,
  growInFaithConfigFields,
  itemTagConfigFields,
  ministryConfigFields,
  sermonConfigFields,
  siteLinkConfigFields,
  socialLinkConfigFields,
  statisticsConfigFields,
  paymentOptionConfigFields,
  scheduleProgramConfigFields,
  nextStepConfigFields,
  questionNextStepConfigFields,
  watchLiveConfigFields,
];

export async function seedConfigFields() {
  const configEntityService = new ConfigFieldService();
  for (const entity of configEntities) {
    configEntityService.create(entity);
  }
  console.log('Seeded Config Fields successfully!');
}
