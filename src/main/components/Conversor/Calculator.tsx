import './utils/calculator.css';

export const Calculator = () => {



    return (
 
<div className='container'>
  <div id='calculator'>

 

    <div id='title' className='text-center'>
      <h5><b>ELECTRONIC CALCULATOR</b></h5>
    </div>

   

    <div id='entrybox' className='text-right'>
      <div id='entry'>
        <p id='answer'>0</p>
      </div>
      <div id='history'>
        <p>0</p>
      </div>
    </div>

    

    <div id='buttons'>

      <button className='red text-white' value='ac'>AC</button>
      <button className='red text-white' value='ce'>CE</button>
      <button className='text-white' value='/'>&divide;</button>
      <button className='text-white' value='*'>x</button>

      <button className='text-white' value='7'>7</button>
      <button className='text-white' value='8'>8</button>
      <button className='text-white' value='9'>9</button>
      <button className='text-white' value='-'>-</button>

      <button className='text-white' value='4'>4</button>
      <button className='text-white' value='5'>5</button>
      <button className='text-white' value='6'>6</button>
      <button className='text-white' value='+'>+</button>


      <button className='text-white' value='1'>1</button>
      <button className='text-white' value='2'>2</button>
      <button className='text-white' value='3'>3</button>
      <button  className='invisible'>N</button>

      <button id='zeroButton' className='text-white' value='0'>0</button>
      <button className="text-white point" value='.'>.</button>
      <button id='equalButton' className='text-white' value='='>=</button>

    </div>
    
    <div id='tester'></div>
  </div>

</div>





    );
}