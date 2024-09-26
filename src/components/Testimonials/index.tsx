import "./index.css";
import { h, Component } from "preact";
import {
    SocialMediaCard,
    SocialMediaCardProps,
} from "components/SocialMediaCard";

interface Props {}

interface State {}

const holyCrossPhonetic = `
wɛ wɛ wɛ wɛ saʊ wɛ
is saʊ nɔɹ nɔɹ wɛ nɔɹ
nɔɹ is is is is nɔɹ
`.trim();

//    nɔɹ
// wɛ     is
//    saʊ

const testimonialsInfo: SocialMediaCardProps[] = [
    {
        pfp: <img src="./images/boss.jpg" alt="Boss Scavenger" />,
        displayName: "ScavQueen 🌸",
        handle: "boss.scavenger642",
        phoneticText: "ðɪs ɪz ɑsəm!\n@#RUNIC@ ɪz soʊ bjutəfəɫ",
        comments: "24",
        likes: "948",
        reposts: "31",
        views: "2.0K",
    },
    {
        pfp: <img src="./images/librarian.jpg" alt="The Librarian" />,
        displayName: "Holy Cross 🐐",
        handle: "the.librarian",
        phoneticText: `@#RUNIC@ is bɔɹɪŋ. tɹævəɫ ðɪs meɪz.\n${holyCrossPhonetic}`,
        comments: "1.7K",
        likes: "6.1K",
        reposts: "5.9K",
        views: "40.1K",
    },
    {
        pfp: <img src="./images/heir.jpg" alt="The Heir" />,
        displayName: "Heirhead",
        handle: "the_only.heir",
        phoneticText: `@#RUNIC@ ɪz jusɫɛs.\nwhaɪ wʊd ɛniwən @love it@?!\ndu səmθɪŋ bɛtɝ wɪð jɔɹ taɪm.`,
        comments: "2",
        likes: "67",
        reposts: "502",
        views: "841",
    },
    {
        pfp: <img src="./images/ruinseeker.jpg" alt="Ruinseeker" />,
        displayName: "From (Fox) Software",
        handle: "real.ruinseeker",
        phoneticText: `θɹuaʊt hɛvən ænd ɝθ,\naɪ əɫoʊn æm ðə @honoured@ wən.\nθæŋk ju fɔɹ @#RUNIC@.`,
        comments: "785",
        likes: "32.1K",
        reposts: "3.6K",
        views: "3.1M",
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
