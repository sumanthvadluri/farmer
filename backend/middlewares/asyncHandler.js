// const asyncHandler =(fn)=>(req,res,next)=>{
//     Promise.resolve(fn(req,res,next)).catch((error)=>{
//         res.status(500).json({message:error.message});
//     });
// }

// export default asyncHandler;

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); // ✅ Pass error to Express's error handler
  };
  
  export default asyncHandler;
  