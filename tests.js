function SupClass() {
    this.supprop1 = 'supprop1';
};

function SubClass() {
    this.subprop1 = 'subprop1';
};

a1 = new SupClass();
a2 = Object.create(SupClass);
a3 = Object.create(SupClass());
a4 = Object.create(new SupClass());
a5 = Object.create(new SupClass);
