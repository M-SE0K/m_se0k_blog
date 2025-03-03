import React from 'react';

function Test(data){
    console.log(JSON.stringify(data))
    const {myParam1} = data
    const {myParam2} = data
    //props 형식으로 받아온 data에서 myParam1, myParam2의 key값을 가지고 값을 추출한다.
    return (
        <div> 
            Test {myParam1}{myParam2}
        </div>
    );
};

export default Test;