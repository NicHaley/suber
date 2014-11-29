#pragma strict

//Define move keys
var moveRight : KeyCode;
var moveLeft : KeyCode;
var moveUp : KeyCode;
var moveDown : KeyCode;

//Define forces for sub movement
var cruisingForceX = Vector2(10,0);
var cruisingForceY = Vector2(0,10);
private var ForceX = cruisingForceX;
private var ForceY = cruisingForceY;

static var isShotEnabled : boolean = true;

//Ship boost
var speedBoost : KeyCode;
var forceIncreaseX = Vector2(50,0);
var forceIncreaseY = Vector2(0,40);
static var boostTimer : float = 0.0;	//Amount of time ship has boosted for
var boostTime : float = 4.0;		//Amount of time ship can boost for
var coolDownDelay : float = 3.0;		//Amount of time ship needs to cool down boosters for
var coolDownRate : float = 1.5;
private var coolDownTimer : float = 3.0;	//Amount of time ship has cooled down for
public var boosting : boolean = false;

//Time slowdown
var timeSlow : KeyCode;
var reducedTimeScale : float = 0.5;
var timeScaleMultiplier : float = 2;
private var standardTimeScale : int = 1;
public var slowOn : boolean = false;
var gM : GameObject;
var slowPitch : float = 0.8;
var normPitch : float = 1.0;
var pitchSpeedMultiplier : float = 2;

//Flashlight keys
var flashlight : KeyCode;
var spotLight : GameObject;		//Attach spot light to sub script

//Says whether Sub is turned right or left
static var isTurnedRight : boolean = true;

var fadeOutTime : float = 1;
var fadeInTime : float = 1;
var maxVol : float = 0.8;

var yVelCutoff : float = 3;
var pushDownForce = Vector2(0, -5);

var suberJets : GameObject;

function FixedUpdate () 
{
//Move code
if (Input.GetKey(moveRight) && !Input.GetKey(moveLeft))
	{
	//rigidbody2D.AddForce.x 
	rigidbody2D.AddForce (ForceX);
	transform.localScale.x = 1;
	isTurnedRight = true;
	}
if (Input.GetKey(moveLeft) && !Input.GetKey(moveRight))
	{
	rigidbody2D.AddForce (-1*ForceX);
	transform.localScale.x = -1;
	isTurnedRight = false;
	}
if (Input.GetKey(moveUp) && transform.position.y < yVelCutoff)
	{
	rigidbody2D.AddForce (ForceY);
	}
	else
		{
		rigidbody2D.AddForce (Vector2(0,0));
		}
if (Input.GetKey(moveDown))
	{
	rigidbody2D.AddForce (-1*ForceY);
	}
	
if (transform.position.y > yVelCutoff)
	{
	rigidbody2D.AddForce (pushDownForce);
	}
	
//Sub Move sound effects
if(Input.GetKey(moveRight) || Input.GetKey(moveLeft) || Input.GetKey(moveUp) || Input.GetKey(moveDown))
	{
		var audioVolFadeIn : float = audio.volume + Time.deltaTime;
		audio.volume = audioVolFadeIn;
		if(audioVolFadeIn >= maxVol)
			{
				audio.volume = maxVol;
			}
		if(!audio.isPlaying)
			{
				audio.Play();
			}
	}
else
	{
		var audioVolFadeOut = audio.volume - Time.deltaTime / fadeOutTime;
		if(audioVolFadeOut <= 0.0)
			{
				audio.Stop();
			}
		audio.volume = audioVolFadeOut;
	}
	
if(Input.GetKey(moveRight) || Input.GetKey(moveLeft))
	{
		suberJets.particleSystem.emissionRate = 50;
		suberJets.particleSystem.startSpeed = 0.4;
	}
else
	{
		suberJets.particleSystem.emissionRate = 3;
		suberJets.particleSystem.startSpeed = 0.4;
	}

//Turn on/off flashlight
if(Input.GetKeyDown(flashlight))
	{
		spotLight.light.enabled = !spotLight.light.enabled;	//Press F once, flashlight enabled becomes not enabled. Press F again
	}														//and flashlight enabled becomes not not enabled, so enabled. Etc etc.

	
if (Input.GetKeyDown (timeSlow)) 
{	
	slowOn = !slowOn;
}

Time.fixedDeltaTime = 0.02 * Time.timeScale;

if(slowOn == true)
{
	var pitchDown : float = gM.audio.pitch - (Time.deltaTime * pitchSpeedMultiplier);
		gM.audio.pitch = pitchDown;
		audio.pitch = pitchDown;
		if(pitchDown <= slowPitch)
			{
				gM.audio.pitch = slowPitch;
				audio.pitch = slowPitch;
			}
	var slowDown : float = Time.timeScale - (Time.deltaTime * timeScaleMultiplier);
	Time.timeScale = slowDown;
	if (slowDown <= reducedTimeScale)
		{
			Time.timeScale = reducedTimeScale;
		}
}

if(slowOn == false)
{
	var pitchUp : float = gM.audio.pitch + (Time.deltaTime * pitchSpeedMultiplier);
	gM.audio.pitch = pitchUp;
	audio.pitch = pitchUp;
	if(pitchUp >= normPitch)
		{
			gM.audio.pitch = normPitch;
			audio.pitch = normPitch;
		}
	var speedUp : float = Time.timeScale + (Time.deltaTime * timeScaleMultiplier);
	Time.timeScale = speedUp;
	if (speedUp >= standardTimeScale)
		{
			Time.timeScale = standardTimeScale;
		}
}	
																									
if(Input.GetKey(speedBoost) && slowOn == false)
	{
		boosting = true;
		
		suberJets.particleSystem.emissionRate = 100;
		suberJets.particleSystem.startSpeed = 1;
		
//		boostTimer += Time.deltaTime;
	
		ForceX = forceIncreaseX;
		ForceY = forceIncreaseY;
		
		isShotEnabled = false;
		
//		coolDownTimer = 0;
	}
else
	{
	boosting = false;
	
	ForceX = cruisingForceX;
	ForceY = cruisingForceY;
	
	isShotEnabled = true;
	}
//	
//	if(!Input.GetKey(speedBoost) || Input.GetKey(speedBoost) && boostTimer >= boostTime)
//	{
//		coolDownTimer += Time.deltaTime;
//		if(coolDownTimer >= coolDownDelay)
//			{
//				boostTimer -= Time.deltaTime * coolDownRate;
//			}
//		if(boostTimer <= 0)
//			{
//				boostTimer = 0;
//			}
//	}
}




