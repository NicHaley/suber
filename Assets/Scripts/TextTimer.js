#pragma strict

var gText: GUIText;
var maxTimer : int = 121;
var timer: float = maxTimer;
var boostDrainMultiplier : float = 3;
var slowDrainMultiplier : float = 3;

var suber : GameObject;

function Update()
{
  timer -= Time.deltaTime * (1 / Time.timeScale);
  gText.color = Color.white;
  
  if (suber.GetComponent(SubControl).slowOn == true)
	  {
		  timer -= Time.deltaTime * (1 / Time.timeScale) * slowDrainMultiplier;
		  gText.color = Color.red;
	  }
  if (suber.GetComponent(SubControl).boosting == true)
	  {
		  timer -= Time.deltaTime * (1 / Time.timeScale) * boostDrainMultiplier;
		  gText.color = Color.red;
	  }
  if (timer < 0) 
  	{
  		timer = 0; // clamp the timer to zero
  	}
  if (timer > maxTimer)
  	{
  		timer = maxTimer;
  	}
  var seconds: int = timer % 60; // calculate the seconds
  var minutes: int = timer / 60; // calculate the minutes
  
  if(seconds < 10)
	  {
	 	  gText.text = minutes + ":0" + seconds;
	  }
  else
	  {
		  gText.text = minutes + ":" + seconds;
	  }
}