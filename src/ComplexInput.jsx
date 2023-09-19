// import React from "react";

// I tried to add this in order to resolve the problem of adding a coupon

// const complexInputValidator = (name, getValues) => ({
//   atLeast1Count: () => {
//     // console.log(getValues()[name].some(({ count }) => !!count));
//     return getValues()[name].some(({ count }) => !!count);
//   }
// });

// const ComplexInput = ({ name, register, getValues }) => {
//   return (
//     <>
//       <input
//         placeholder="Count #1"
//         name={`${name}[0].count`}
//         ref={register({ validate: complexInputValidator(name, getValues) })}
//         type="tel"
//       />
//       <input
//         placeholder="Count #2"
//         name={`${name}[1].count`}
//         ref={register({ validate: complexInputValidator(name, getValues) })}
//         type="tel"
//       />
//       <input
//         placeholder="Count #3"
//         name={`${name}[2].count`}
//         ref={register({ validate: complexInputValidator(name, getValues) })}
//         type="tel"
//       />
//       <br />
//       <br />
//       <br />
//       <input
//         placeholder="Weight #1"
//         name={`${name}[0].weight`}
//         ref={register({ validate: complexInputValidator(name, getValues) })}
//         type="tel"
//       />
//       <input
//         placeholder="Weight #2"
//         name={`${name}[1].weight`}
//         ref={register({ validate: complexInputValidator(name, getValues) })}
//         type="tel"
//       />
//       <input
//         placeholder="Weight #3"
//         name={`${name}[2].weight`}
//         ref={register({ validate: complexInputValidator(name, getValues) })}
//         type="tel"
//       />
//     </>
//   );
// };

// export default ComplexInput;
