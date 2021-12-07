import {useState, useEffect, useRef} from 'react';

// 👇️ extract logic into reusable hook
export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  return isMounted;
}


//Normal usage in useEffect
// const normalUsage = ()=>{
//   //👇️ set isMounted to true
//   let isMounted = true;
//   if(isMounted){
//     //... Do Something
//   }
//   return () => {
//     // 👇️ when component unmounts, set isMounted to false
//       isMounted = false;
//   };
// }


// if (isMountedRef.current) {
        //     if (referenceInfo.length !== 0) {
        //         if (firstCycleInfo[0]?.candidate_edu_cycle_ref.length !== 0) setRepeatersID(firstCycleInfo[0].candidate_edu_cycle_ref)
        //         if (secondCycleInfo[0]?.candidate_edu_cycle_ref.length !== 0) setRepeatersID(secondCycleInfo[0].candidate_edu_cycle_ref)
        //         if (thirdCycleInfo[0]?.candidate_edu_cycle_ref.length !== 0) setRepeatersID(thirdCycleInfo[0].candidate_edu_cycle_ref)
        //         if (fourthCycleInfo[0]?.candidate_edu_cycle_ref.length !== 0) setRepeatersID(fourthCycleInfo[0].candidate_edu_cycle_ref)
        //     }
        // }


         // if (isMountedRef.current) {
        //     if (referenceInfo.length !== 0) {
        //         if (firstCycleInfo[0]?.candidate_edu_cycle_ref.length !== 0) setRepeatersID(firstCycleInfo[0].candidate_edu_cycle_ref)
        //         if (secondCycleInfo[0]?.candidate_edu_cycle_ref.length !== 0) setRepeatersID(secondCycleInfo[0].candidate_edu_cycle_ref)
        //         if (thirdCycleInfo[0]?.candidate_edu_cycle_ref.length !== 0) setRepeatersID(thirdCycleInfo[0].candidate_edu_cycle_ref)
        //         if (fourthCycleInfo[0]?.candidate_edu_cycle_ref.length !== 0) setRepeatersID(fourthCycleInfo[0].candidate_edu_cycle_ref)
        //     }
        // }

        //👇️ set isMounted to true

        /*
        let isMounted = true;
        const timer = setTimeout(() => {
            if (isMounted) {
                setRepeaterIDs();
            }
        }, 3000);
        return () => {
            clearTimeout(timer);
            isMounted = false;
        }
        */
