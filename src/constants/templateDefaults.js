export const DEFAULT_TEMPLATE = {
  name: 'Default Certificate',
  description: 'A simple certificate template',
  size: 'A4',
  orientation: 'landscape',
  backgroundColor: '#ffffff',
  backgroundImage: '',
  elements: [
    {
      id: 'title',
      type: 'text',
      content: 'Certificate of Completion',
      x: 50,
      y: 20,
      width: 50,
      height: 10,
      fontSize: 36,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'center'
    },
    {
      id: 'subtitle',
      type: 'text',
      content: 'This is to certify that',
      x: 50,
      y: 35,
      width: 50,
      height: 5,
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      color: '#666666',
      textAlign: 'center'
    },
    {
      id: 'attendeeName',
      type: 'text',
      content: '[[AttendeeName]]',
      x: 50,
      y: 45,
      width: 50,
      height: 8,
      fontSize: 32,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      color: '#2563eb',
      textAlign: 'center'
    },
    {
      id: 'completionText',
      type: 'text',
      content: 'has successfully completed',
      x: 50,
      y: 58,
      width: 50,
      height: 5,
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      color: '#666666',
      textAlign: 'center'
    },
    {
      id: 'eventTitle',
      type: 'text',
      content: '[[CourseEventTitle]]',
      x: 50,
      y: 68,
      width: 50,
      height: 8,
      fontSize: 24,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'center'
    }
  ],
  customFields: {}
};

export const MERGE_TAGS = [
  { tag: '[[AttendeeName]]', description: 'Full name of the attendee' },
  { tag: '[[CourseEventTitle]]', description: 'Title of the event' },
  { tag: '[[CompletionDate]]', description: 'Date of completion' },
  { tag: '[[SigningAuthorityName]]', description: 'Name of signing authority' },
  { tag: '[[SigningAuthorityTitle]]', description: 'Title of signing authority' },
  { tag: '[[CertificateID]]', description: 'Unique certificate identifier' },
  { tag: '[[CustomField1]]', description: 'Custom field 1' },
  { tag: '[[CustomField2]]', description: 'Custom field 2' },
  { tag: '[[CustomField3]]', description: 'Custom field 3' }
];

export const TEMPLATE_SIZES = [
  { value: 'A4', label: 'A4 (210 × 297 mm)' },
  { value: 'Letter', label: 'Letter (8.5 × 11 in)' },
  { value: 'Legal', label: 'Legal (8.5 × 14 in)' },
  { value: 'Tabloid', label: 'Tabloid (11 × 17 in)' }
];

export const FONT_FAMILIES = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'Impact',
  'Comic Sans MS'
];

export const FONT_SIZES = [
  8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72
];