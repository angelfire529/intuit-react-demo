import Cards from '../Card/Cards'
import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({adapter: new Adapter()});
let state;
beforeAll(() => {
    state = {
        contacts: [
         {"firstName": "Joe", "lastName": "Shmoe", "phone": "5552221123", "email": "jshmoe@test.com", "title": "Director of Finance", "collapse": "false"},
         {"firstName": "Jane", "lastName": "Doe", "phone": "4159874521", "email": "kdoe@test.com", "title": "Sr. Accounts Manager", "collapse": "false"},
         {"firstName": "Mike", "lastName": "Hannity", "phone": "5322221123", "email": "mhannity@test.com", "title": "Sales", "collapse": "false"},
        ],
        openModal: false,
        isAdd: false,
    }
})

describe('<Cards />', () => {
   it(`should open the modal`, () => {
        const cards = shallow(<Cards />).setState(state);
        expect(cards.state('openModal')).toBeFalsy();
        expect(cards.state('isAdd')).toBeFalsy();

        cards.find('.add-contact').simulate('click');
        expect(cards.state('openModal')).toBeTruthy();
        expect(cards.state('isAdd')).toBeTruthy();
   }) 

   it('should add new contact', () => {
       const newContact = {"firstName": "Billy", "lastName": "Joel", "phone": "5552221123", "email": "jshmoe@test.com", "title": "Director of Finance", "collapse": "false"}
       const wrapper = mount(<Cards />);
       wrapper.setState(state)

       const instance = wrapper.instance();

       instance.addContact(newContact);
       expect(wrapper.state('contacts')).toHaveLength(4);
   })

   it('should update an existing contact', () => {})
})