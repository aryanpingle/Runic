import "./index.css";
import { h, Component } from "preact";
import {
    SocialMediaCard,
    SocialMediaCardProps,
} from "components/SocialMediaCard";

interface Props {}

interface State {}

const holyCrossPhonetic = `
nɔɹ wɛ is         is
saʊ   is   saʊ saʊ   nɔɹ
saʊ   wɛ nɔɹ is nɔɹ   saʊ
O         wɛ is wɛ
`.trim();

const testimonialsInfo: SocialMediaCardProps[] = [
    {
        pfp: <img src="./images/boss.jpg" alt="Boss Scavenger" />,
        displayName: "ScavQueen 🌸",
        handle: "boss.scavenger642",
        phoneticText: "ðɪs ɪz ɑsəm!\n@#runic@",
        comments: 300,
        likes: 1000,
        reposts: 1010,
        views: 50000,
    },
    {
        pfp: <img src="./images/librarian.jpg" alt="The Librarian" />,
        displayName: "Holy Cross 🐐",
        handle: "the.librarian",
        phoneticText: `bɔɹɪŋ. ɛniweɪ.\n\n${holyCrossPhonetic}\n@#runic@`,
        comments: 300,
        likes: 1000,
        reposts: 1010,
        views: 50000,
    },
];

export class Testimonials extends Component<Props, State> {
    render(props: Props, state: State) {
        return (
            <div className="testimonials">
                {...testimonialsInfo.map((info) => (
                    <SocialMediaCard {...info} />
                ))}
            </div>
        );
    }
}
