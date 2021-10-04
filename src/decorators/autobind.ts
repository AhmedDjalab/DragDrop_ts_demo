// auto bind decorator
export function autobind(_: any, _2: string, description: PropertyDescriptor) {
  const orginalMethod = description.value;
  const adjDecriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = orginalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDecriptor;
}
