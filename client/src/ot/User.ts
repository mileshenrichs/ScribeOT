import Selection, {DEFAULT_SELECTION} from './Selection';

export default class User {
    nickname: string = '';
    selection: Selection = DEFAULT_SELECTION;
    color?: string;
}