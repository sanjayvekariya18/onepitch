import Vue from 'vue';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

// Access v-calendar, v-date-packer and v-popover components
var options = {
    // OPTIONAL: Pass default settings here (default values shown below)
    componentPrefix: 'v',
    firstDayOfWeek: 1, // Sunday is the default
    navVisibility: 'focus',
    titlePosition: 'center',
    titleTransition: 'slide-h', // Horizontal slide
    weeksTransition: 'slide-h',
    dateFormatter: d => d.toLocaleDateString(),
    dateParser: s => new Date(Date.parse(s)),
    datePickerInputClass: '',
    datePickerInputStyle: null,
    datePickerInputPlaceholder: '',
    datePickerSelectColor: '#FFD731',
    datePickerDragColor: '#FFF7D6', // Only used for drag mode
    datePickerShowCaps: false, // Only used for drag mode
    datePickerShowPopover: true,
    popoverExpanded: false,
    popoverDirection: 'bottom',
    popoverAlign: 'right',
    popoverVisibility: 'focus',
    popoverContentOffset: '10px',
    maxSwipeTime: 300, // ms
    minHorizontalSwipeDistance: 60, // px
    maxVerticalSwipeDistance: 80, // px
    maxTapTolerance: 0, // ms
    maxTapDuration: 200, // ms
    highlight: {
        animated: true,
        height: '1.8rem',
        borderWidth: '0',
        borderStyle: 'solid',
        borderRadius: '290486px',
        opacity: 1,
    },
    highlightCaps: {
        animated: true,
        height: '1.9rem',
        borderWidth: '0',
        borderStyle: 'solid',
        borderRadius: '290486px',
        opacity: 1,
    },
    dot: {
        diameter: '5px',
        backgroundColor: '#66b3cc',
        borderWidth: '0',
        borderStyle: 'solid',
        borderRadius: '50%',
        opacity: 1,
    },
    bar: {
        height: '3px',
        backgroundColor: '#66b3cc',
        borderWidth: '0',
        borderStyle: 'solid',
        opacity: 1,
    },
    themeStyles: {
        wrapper: {backgroundColor: '#fafafa', border: '1px solid #dadada'},
        verticalDivider: {borderLeft: '1px solid #dadada'},
        // header: null,
        // headerTitle: null,
        // headerArrows: null,
        // headerVerticalDivider: null,
        // headerHorizontalDivider: null,
        // weekdays: null,
        // weekdaysVerticalDivider: null,
        // weekdaysHorizontalDivider: null,
        // weeks: null,
        // weeksVerticalDivider: null,
        // dayCell: null,
        dayCellNotInMonth: {opacity: 0.4},
        // dayContent: null,
        // dayContentHover: null,
        // dots: null,
        // bars: null,
        dayPopoverContent: {
            color: '#333333',
            fontSize: '.8rem',
            whiteSpace: 'nowrap',
        }
    }
};

Vue.use(VCalendar, options);
