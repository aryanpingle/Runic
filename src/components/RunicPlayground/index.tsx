import { RuneSVG } from "components/RuneSVG";
import { h, Component } from "preact";

interface Props {}
interface State {}

export class RunicPlayground extends Component<Props, State> {
    render() {
        return (
            <RuneSVG
                phoneticText="pɫeɪɡɹaʊn"
                interactive={true}
                displayPhonemes={true}
                styles={{
                    runeGuideColor: "#121212"
                }}
            />
        );
    }
}
