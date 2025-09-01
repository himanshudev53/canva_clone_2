import { ArrowDown, ArrowUp, Blend, BookType, Component, Folder, Home, Image, LayoutDashboardIcon, LayoutTemplate, LucideProps, Minus, Palette, Settings, ShapesIcon, Sparkle, Square, SquareRoundCorner, Trash, Type, Wallet, WalletCardsIcon, Box } from "lucide-react";
import BackrgoundSetting from "./Components/BackrgoundSetting";
import AiTransformSetting from "./Components/AiTransformSetting";
import TextSettings from "./Components/TextSettings";
import AddImageSetting from "./Components/AddImageSetting";
import TemplatesList from "./Components/TemplatesList";
import Elements from "./Components/Elements";
import FillColor from "./Sharable/FillColor";
import BorderColor from "./Sharable/BorderColor";
import BorderWidth from "./Sharable/BorderWidth";
import Opacity from "./Sharable/Opacity";
import BorderRadius from "./Sharable/BorderRadius";
import MoveForward from "./Sharable/MoveForward";
import MoveBackword from "./Sharable/MoveBackword";
import BoxShadow from "./Sharable/BoxShadow";
import FontFamily from "./Sharable/FontFamily";
// import BackrgoundSetting from "./Components/BackrgoundSetting";
// import AddImageSetting from "./Components/AddImageSetting";
// import Shapes from "./Sharable/Shapes";
// import Elements from "./Components/Elements";
// import FillColor from "./Sharable/FillColor";
// import BorderColor from "./Sharable/BorderColor";
// import BorderWidth from "./Sharable/BorderWidth";
// import Opacity from "./Sharable/Opacity";
// import BorderRadius from "./Sharable/BorderRadius";
// import AiTransformSetting from "./Components/AiTransformSetting";
// import TextSettings from "./Components/TextSettings";
// import FontFamily from "./Sharable/FontFamily";
// import TemplatesList from "./Components/TemplatesList";
// import MoveForward from "./Sharable/MoveForward";
// import MoveBackword from "./Sharable/MoveBackword";

export const WorkspaceMenu = [
    {
        name: 'Home',
        icon: Home,
        path: '/workspace'
    },
    {
        name: 'Projects',
        icon: Folder,
        path: '/workspace/projects'
    },
    {
        name: 'Templates',
        icon: LayoutDashboardIcon,
        path: '/workspace/templates'
    },
    {
        name: 'Billing',
        icon: WalletCardsIcon,
        path: '/workspace/billing'
    },

]

export const canvasSizeOptions = [
    {
        name: 'Instagram Post',
        width: 500,
        height: 500,
        icon: '/instagram.png'
    },
    {
        name: 'Instagram Story',
        width: 473,
        height: 700,
        icon: '/instagram.png'
    },
    {
        name: 'YouTube Thumbnail',
        width: 700,
        height: 394,
        icon: '/youtube.png'
    },
    {
        name: 'YouTube Banner',
        width: 700,
        height: 394,
        icon: '/youtube-2.png'
    },
    {
        name: 'YouTube Post',
        width: 500,
        height: 500,
        icon: '/youtube.png'
    },
    {
        name: 'PowerPoint Slide',
        width: 700,
        height: 394,
        icon: '/ppt.png'
    },
    {
        name: 'Flyer (A4)',
        width: 508,
        height: 700,
        icon: '/circle.png'
    },
    {
        name: 'Facebook Post',
        width: 700,
        height: 368,
        icon: '/facebook.png'
    },
    {
        name: 'Twitter Post',
        width: 700,
        height: 394,
        icon: '/twitter.png'
    },
    {
        name: 'LinkedIn Post',
        width: 700,
        height: 366,
        icon: '/linkedin.png'
    },
    {
        name: 'Pinterest Pin',
        width: 467,
        height: 700,
        icon: '/pinterest.png'
    },
];


export const sideBarMenu: Array<{ name: string; desc: string; icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; component?: React.ReactNode }> = [
    {
        name: 'Templates',
        desc: 'Select Prebuild Template',
        icon: LayoutTemplate,
        component: <TemplatesList />
    },
    {
        name: 'Elements',
        desc: 'Select Shapes and Stickers',
        icon: ShapesIcon,
        component: <Elements />
    },
    {
        name: 'Images',
        desc: 'Add Image or Upload your own',
        icon: Image,
        component: <AddImageSetting />
    },
    {
        name: 'Text',
        desc: 'Add Text and Heading',
        icon: Type,
        component: <TextSettings />
    },
    {
        name: 'AI',
        desc: 'More AI Feature to enhance your design',
        icon: Sparkle,
        component: <AiTransformSetting />
    },
    {
        name: 'Background',
        desc: 'Change Canvas Background',
        icon: Component,
        component: <BackrgoundSetting />
    },
    {
        name: 'Settings',
        desc: 'Update Canvas Size and background',
        icon: Settings
    }
]

export const ShapeList = [
    {
        name: 'Circle',
        icon: '/moon.png'
    },
    {
        name: 'Square',
        icon: '/square.png'
    },
    {
        name: 'Triangle',
        icon: '/trangle.png'
    },
    {
        name: 'Line',
        icon: '/line.png'
    }
]


export const shapesSettingsList = [
    {
        name: 'Fill',
        icon: Palette,
        component: <FillColor />
    },
    {
        name: 'Stroke Color',
        icon: Square,
        component: <BorderColor />
    },
    {
        name: 'Stroke Width',
        icon: Minus,
        component: <BorderWidth />
    },
    {
        name: 'Opacity',
        icon: Blend,
        component: <Opacity />
    },
    {
        name: 'Rounded Corner',
        icon: SquareRoundCorner,
        component: <BorderRadius />
    },
    {
        name: "Shadow",
        icon: Box,
        component: <BoxShadow />
    },
    {
        name: 'Bring Front',
        icon: ArrowUp,
        component: <MoveForward />
    },
    {
        name: 'Move Back',
        icon: ArrowDown,
        component: <MoveBackword />
    },
    // {
    //     name: 'Delete',
    //     icon: Trash
    // }
]

export const AITransformationSettings = [
    {
        name: 'Background Remove',
        command: 'e-bgremove',
        image: '/remove-bg.jpg'
    },
    {
        name: 'Change Background',
        command: 'e-changebg-prompt-snow',
        image: '/change-bg.jpg',
        input: true
    },
    {
        name: 'Generative fill',
        command: 'bg-genfill,w-1000,h-960,cm-pad_resize',
        image: '/generative-fill.png',
    },
    {
        name: 'AI drop shadow',
        command: 'e-dropshadow',
        image: '/shadow.jpeg'
    },
    {
        name: 'Upscale',
        command: 'e-upscale',
        image: '/upscale.png'
    },
    {
        name: 'Smart crop',
        command: 'fo-auto',
        image: '/smartcrop.png'
    },
    {
        name: 'Contrast',
        command: 'e-contrast',
        image: '/e-contrast.png'
    },
    {
        name: 'Grayscale',
        command: 'e-grayscale',
        image: '/grayscale.png'
    },
    {
        name: 'Blur',
        command: 'bl-10',
        image: '/e-blur.png'
    },
    {
        name: 'Flip',
        command: 'e-flip',
        image: '/e-flip.png'
    }
]


export const TextSettingsList = [
    {
        name: 'Fill',
        icon: Palette,
        component: <FillColor />
    },
    {
        name: 'Stroke Color',
        icon: Square,
        component: <BorderColor />
    },
    {
        name: 'Stroke Width',
        icon: Minus,
        component: <BorderWidth />
    },
    {
        name: 'Opacity',
        icon: Blend,
        component: <Opacity />
    },
    {
        name: 'Font',
        icon: BookType,
        component: <FontFamily />
    },
    {
        name: 'Bring Front',
        icon: ArrowUp,
        component: <MoveForward />
    },
    {
        name: 'Move Back',
        icon: ArrowDown,
        component: <MoveBackword />
    },
]

export const FontFamilyList = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
    "Palatino",
    "Bookman",
    "Comic Sans MS",
    "Impact",
    "Lucida Sans Unicode",
    "Geneva",
    "Lucida Console",
]

export const StickerList = [
    // Original Icons (for continuity)
    'https://cdn-icons-png.flaticon.com/256/428/428094.png',
    'https://cdn-icons-png.flaticon.com/256/2111/2111463.png',
    'https://cdn-icons-png.flaticon.com/256/5968/5968764.png',
    'https://cdn-icons-png.flaticon.com/256/1384/1384060.png',
    'https://cdn-icons-png.flaticon.com/256/733/733585.png',
    'https://cdn-icons-png.flaticon.com/256/2111/2111646.png',
    'https://cdn-icons-png.flaticon.com/256/4494/4494477.png',
    'https://cdn-icons-png.flaticon.com/256/281/281764.png',
    'https://cdn-icons-png.flaticon.com/256/1409/1409941.png',
    'https://cdn-icons-png.flaticon.com/256/10851/10851235.png',
    'https://cdn-icons-png.flaticon.com/256/520/520460.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791311.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791320.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791292.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791355.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791307.png',
    'https://cdn-icons-png.flaticon.com/256/7996/7996409.png',
    'https://cdn-icons-png.flaticon.com/256/8760/8760748.png',
    'https://cdn-icons-png.flaticon.com/256/5171/5171530.png',
    'https://cdn-icons-png.flaticon.com/256/5175/5175169.png',
    'https://cdn-icons-png.flaticon.com/256/7096/7096435.png',
    'https://cdn-icons-png.flaticon.com/256/346/346167.png',
    'https://cdn-icons-png.flaticon.com/256/1776/1776968.png',
    'https://cdn-icons-png.flaticon.com/256/1497/1497177.png',
    'https://cdn-icons-png.flaticon.com/256/2517/2517029.png',
    'https://cdn-icons-png.flaticon.com/256/2276/2276906.png',
    'https://cdn-icons-png.flaticon.com/256/6604/6604292.png',
    'https://cdn-icons-png.flaticon.com/256/6010/6010131.png',
    'https://cdn-icons-png.flaticon.com/256/11167/11167978.png',
    'https://cdn-icons-png.flaticon.com/256/11145/11145432.png',
    'https://cdn-icons-png.flaticon.com/256/7645/7645528.png',
    'https://cdn-icons-png.flaticon.com/256/16116/16116383.png',
    'https://cdn-icons-png.flaticon.com/256/639/639373.png',

    // --- NEW ADDITIONS BELOW ---

    // Nature & Animals
    'https://cdn-icons-png.flaticon.com/256/2935/2935413.png', // Sun
    'https://cdn-icons-png.flaticon.com/256/740/740922.png',   // Cat
    'https://cdn-icons-png.flaticon.com/256/4290/4290854.png', // Dog
    'https://cdn-icons-png.flaticon.com/256/706/706797.png',   // Bee
    'https://cdn-icons-png.flaticon.com/256/2942/2942946.png', // Butterfly
    'https://cdn-icons-png.flaticon.com/256/847/847483.png',   // Penguin
    'https://cdn-icons-png.flaticon.com/256/2589/2589903.png', // Unicorn
    'https://cdn-icons-png.flaticon.com/256/2927/2927347.png', // Tree
    'https://cdn-icons-png.flaticon.com/256/3522/3522696.png', // Rainbow

    // Food & Drink
    'https://cdn-icons-png.flaticon.com/256/3081/3081985.png', // Pizza
    'https://cdn-icons-png.flaticon.com/256/2718/2718134.png', // Burger
    'https://cdn-icons-png.flaticon.com/256/3475/3475047.png', // Ice Cream
    'https://cdn-icons-png.flaticon.com/256/3145/3145853.png', // Sushi
    'https://cdn-icons-png.flaticon.com/256/3050/3050106.png', // Coffee
    'https://cdn-icons-png.flaticon.com/256/3186/3186954.png', // Boba Tea
    'https://cdn-icons-png.flaticon.com/256/1046/1046857.png', // Beer
    'https://cdn-icons-png.flaticon.com/256/2836/2836664.png', // Cocktail

    // Emotions & Expressions
    'https://cdn-icons-png.flaticon.com/256/742/742751.png',   // Heart Eyes
    'https://cdn-icons-png.flaticon.com/256/1014/1014019.png', // Crying Laughing
    'https://cdn-icons-png.flaticon.com/256/1037/1037851.png', // Wow / Surprised
    'https://cdn-icons-png.flaticon.com/256/1037/1037855.png', // Kiss
    'https://cdn-icons-png.flaticon.com/256/1037/1037860.png', // Cool / Sunglasses
    'https://cdn-icons-png.flaticon.com/256/2102/2102921.png', // Devil / Mischievous
    'https://cdn-icons-png.flaticon.com/256/2102/2102922.png', // Angel / Halo
    'https://cdn-icons-png.flaticon.com/256/2102/2102035.png', // Thinking

    // Objects & Symbols
    'https://cdn-icons-png.flaticon.com/256/1828/1828884.png', // Star
    'https://cdn-icons-png.flaticon.com/256/3522/3522668.png', // Fire
    'https://cdn-icons-png.flaticon.com/256/1170/1170678.png', // Music Note
    'https://cdn-icons-png.flaticon.com/256/3142/3142749.png', // Gift
    'https://cdn-icons-png.flaticon.com/256/2583/2583395.png', // Balloon
    'https://cdn-icons-png.flaticon.com/256/3142/3142736.png', // Party Popper
    'https://cdn-icons-png.flaticon.com/256/1067/1067546.png', // Light Bulb
    'https://cdn-icons-png.flaticon.com/256/2549/2549906.png', // Rocket

    // Holidays & Events
    'https://cdn-icons-png.flaticon.com/256/3522/3522684.png', // Christmas Tree
    'https://cdn-icons-png.flaticon.com/256/3522/3522678.png', // Snowman
    'https://cdn-icons-png.flaticon.com/256/3522/3522687.png', // Santa Hat
    'https://cdn-icons-png.flaticon.com/256/3522/3522691.png', // Ghost (Halloween)
    'https://cdn-icons-png.flaticon.com/256/3522/3522692.png', // Pumpkin (Halloween)
    'https://cdn-icons-png.flaticon.com/256/3153/3153685.png', // Heart (Valentine's)
    'https://cdn-icons-png.flaticon.com/256/3153/3153689.png', // Clover (St. Patrick's)
    'https://cdn-icons-png.flaticon.com/256/3153/3153692.png', // Fireworks (New Year's)

    // Travel & Locations
    'https://cdn-icons-png.flaticon.com/256/284/284515.png',   // Globe
    'https://cdn-icons-png.flaticon.com/256/684/684809.png',   // Airplane
    'https://cdn-icons-png.flaticon.com/256/2534/2534976.png', // Mountain
    'https://cdn-icons-png.flaticon.com/256/814/814818.png',   // Palm Tree (Beach)
    'https://cdn-icons-png.flaticon.com/256/814/814823.png',   // Sun Cream (Beach)
    'https://cdn-icons-png.flaticon.com/256/854/854878.png',   // Camera
    'https://cdn-icons-png.flaticon.com/256/854/854890.png',   // Map
];