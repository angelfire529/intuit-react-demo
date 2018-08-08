import _ from "lodash";

export const formatPhone = (number) => {
	return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`
};

export const isUnique = (contacts, contact) => {
	//TODO: rewrite without using lodash
	return _.findIndex(contacts, (c) => {
		return c.firstName.trim().toUpperCase() === contact.firstName.trim().toUpperCase()
			&& c.lastName.trim().toUpperCase() === contact.lastName.trim().toUpperCase()
			|| c.email.trim().toUpperCase() === contact.email.trim().toUpperCase()
	}) === -1;
};