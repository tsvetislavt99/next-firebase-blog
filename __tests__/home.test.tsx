import { expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from '../pages';
import { PostModel } from '../lib/globalTypes';
import { Timestamp } from 'firebase/firestore';

test('home', () => {
    render(<Home posts={postsMock} />);
    const main = within(screen.getByRole('main'));
    expect(
        main.getByRole('heading', {
            name: /Next.js 12: Biggest Release Ever/i,
        })
    ).toBeDefined();
    postsMock.forEach((post) => {
        expect(main.findAllByText(post.title)).toBeDefined();
    });
});

const postsMock: PostModel[] = [
    {
        title: 'some-awesome-test-post',
        content:
            '# Typewriter Animation made with CSS3\n\nThe animation uses the `::before` and `::after` pseudo elements. It is composed of 2 animations:\n- `typewriter` - The animation moves left until it gets to `left: 100%;` \n- `blink` - The animation changes the background from `transparent` to a solid color, which creates a blinking effect.\n\nRequirments:\n- In order for the animation to work you need to use a `monospace` font\n\nCSS Variables:\n- `--bg-color: hsl(49 37% 94%);` - Background color\n- `--typewriterSpeed: 3s;` - Duration of the type animation\n- `--typewriterCharactersHeading: 20;` - Number of characters in the Heading\n- `--typewriterCharactersSubTitle: 24;` - Number of characters in the Sub Title\n\nPreview of the Typewriter Animation: \n\n\n![Preview of the animation](https://github.com/tsvetislavt99/typewriter-animation-css/blob/master/AnimationGIF.gif?raw=true)',
        published: true,
        slug: 'some-awesome-test-post',
        uid: 'BSxsz8XdzbhDgP42ts45OU019Ma2',
        username: 'ttodorov',
        heartCount: 0,
        createdAt: new Date(1653578633083).getTime() as unknown as Timestamp,
        updatedAt: new Date(1653578633083).getTime() as unknown as Timestamp,
    },
    {
        title: 'Markdown Basics',
        content:
            '# Basics of Markdown\nMarkdown is the most popular markup language that can be used to format documents. It can be used to create *websites*,*ebooks*,*email*,*chats in discussions forums*.\n\n## Topics\n1. Paragraphs \n\n    MD expects a full line space to show texts in a different line else it joins text in the same line.\n2.  Text decorations\n\n    MD can write **bold** texts, ~~italiic~~ *italic*  texts\n3. Headings\n    No of #\'s represent the type of heading. Github will automatically add id\'s to headings, so the text will be automatically linked. \n    ## This is h2\n    ### This is h3\n4. Links\n\n   [My Github](https://github.com/bhupendra1011 "all repos") account.[Bhupendra][1] github repo.\n\n5. Images\n    Images can be used just like links. ![Alt txt](img url)\n\n    !["cat Img"](http://placekitten.com/200/200)\n\n    Thumbnails images can also be used which links to larger image \n    [<img src="http://placekitten.com/20/20">](http://placekitten.com/200/200)\n\n6. Ordered and Unordered Lists\n\n    Coding Best Practices:\n\n    * Keep code DRY\n    * Writing Unit Test cases\n    * Checking cross-browser support\n\n    Steps to merge branch:\n\n    1. Create a branch from feature\n    1. commit your changes\n    1. push your changes\n    1. raise a pull request\n\n7. Code Blocks\n\n    This is super helpful when posting any code snippet\n\n\n    ```js\n    const fn = () => alert("some fn");\n    ```\n\n\n\n\n    ```css\n    .hide {\n        display:none\n    }\n    ```\n\n\n    Also can show code difference\n\n\n    ```diff\n    var x = 10;\n    - const counter = 0;\n    + let counter = 0\n    ```\n\n\n\n8. Tables \n\n    Tables can be generated with headings and text alignment option\n\n    |Stocks|Price|\n    |:-----:|------:|\n    |TCS|230|\n    |YES Bank|500|\n\n\n\nCool Tips \n\n * [Grammarly](https://marketplace.visualstudio.com/items?itemName=znck.grammarly) extension can eliminate typo and grammar mistakes\n * [ScreenTOGif](https://www.screentogif.com/) to record videos in GIF format\n * Upload GIF\'s to [giphy](https://giphy.com/) to embed them into blog posts.\n * [Stackedit](https://stackedit.io/) for Markdown Editing in Browser.\n\nTesting modal confirmation\n',
        published: true,
        slug: 'markdown-basics',
        uid: 'BSxsz8XdzbhDgP42ts45OU019Ma2',
        username: 'ttodorov',
        heartCount: 1,
        createdAt: new Date(1653578633083).getTime() as unknown as Timestamp,
        updatedAt: new Date(1653578633083).getTime() as unknown as Timestamp,
    },
];
