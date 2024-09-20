import "./index.css";

import { RuneSVG } from "components/RuneSVG";
import { h, Component } from "preact";

interface Props {}
interface State {}

export class RunicPlayground extends Component<Props, State> {
    render() {
        return (
            <div className="runic-playground">
                <RuneSVG
                    phoneticText="aɪaɪaɪaɪaɪ"
                    interactive={true}
                    displayPhonemes={true}
                    runeColor="cornflowerblue"
                    runeGuideColor="#242424"
                />
            </div>
        );
    }
}
