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
                    phoneticText="aɪaɪaɪaɪaɪaɪaɪaɪ"
                    interactive={true}
                    displayPhonemes={true}
                    styles={{
                        runeColor: "cornflowerblue",
                        runeGuideColor: "#121212",
                    }}
                />
            </div>
        );
    }
}
