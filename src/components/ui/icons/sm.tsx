import { IconDefinition, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon({icon}: {icon: IconDefinition}){
    return <FontAwesomeIcon icon={icon} className="h-3"/> 
}