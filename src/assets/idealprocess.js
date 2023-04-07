console.log('imported script');
const stripe = Stripe(
	'pk_test_51M7uoLJyjfKMZqRPm63an76anIFIrBAR7f0EW7XOKWtFBPp0BxiOiVCVqGlVQxsNpC9qee4QH2NHWdeR4oU7WzlL00WP7L9A07'
);

const elements = stripe.elements();
const idealBank = elements.create('idealBank');
console.log('Banks:', idealBank);
