import {
    SocialMediaCommentIcon,
    SocialMediaHeartIcon,
    SocialMediaRepostIcon,
    SocialMediaViewsIcon,
} from "components/icons";
import "./index.css";

import { RuneSVG } from "components/RuneSVG";
import { h, Component, VNode } from "preact";
import { translateSentence } from "../../ipa";

export interface SocialMediaCardProps {
    pfp: VNode<HTMLImageElement>;
    displayName: string;
    handle: string;
    phoneticText: string;
    likes: string;
    comments: string;
    reposts: string;
    views: string;
}

interface State {}

export class SocialMediaCard extends Component<SocialMediaCardProps, State> {
    render(props: SocialMediaCardProps, state: State) {
        return (
            <div class="sm-card">
                <div className="sm-card__pfp">{props.pfp}</div>
                <div className="sm-card__header">
                    <span className="sm-card__display-name">
                        {props.displayName}
                    </span>
                    <span className="sm-card__handle">
                        @{props.handle} · Sep 23
                    </span>
                </div>
                <div className="sm-card__content">
                    <RuneSVG
                        phoneticText={props.phoneticText}
                        displayPhonemes={false}
                        interactive={false}
                        runeColor="black"
                    />
                </div>
                <div className="sm-card__interactions">
                    <span>
                        <SocialMediaCommentIcon />
                        {props.comments}
                    </span>
                    <span>
                        <SocialMediaRepostIcon />
                        {props.reposts}
                    </span>
                    <span>
                        <SocialMediaHeartIcon />
                        {props.likes}
                    </span>
                    <span>
                        <SocialMediaViewsIcon />
                        {props.views}
                    </span>
                </div>
            </div>
        );
    }
}
