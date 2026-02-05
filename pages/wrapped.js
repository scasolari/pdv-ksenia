import SlideContainer from "@/components/SlideContainer";
import { slides } from "@/data/slides";

export default function Wrapped() {
    return <SlideContainer slides={slides} />;
}
