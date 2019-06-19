import Enzyme from 'enzyme';
import EnzymeAdapterReact from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new EnzymeAdapterReact()});
