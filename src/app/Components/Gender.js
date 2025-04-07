
import { useSelector } from 'react-redux';

const GenderComponent = ({ gender }) => {  // Destructure the prop
  const userData = useSelector((state) => state.UserData);
  let genderCount;
  const gcolors = ['#0055A4', '#D81B60']; // Dark blue and dark pink
  
  if(gender === 'Male'){
    genderCount = userData.maleCount;
  }
  else {
    genderCount = userData.femaleCount;
  }

  return (
    <div>
        <h1 style={{ color: gender === 'Male' ? gcolors[0] : gcolors[1] }}>
          {gender}: {genderCount}
        </h1>
    </div>
  )
}

export default GenderComponent;  // Add this export