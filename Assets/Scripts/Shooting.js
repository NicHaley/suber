#pragma strict

//weapon commands
var fireWeapon : KeyCode;
var changeWeaponType : KeyCode;

//missile variables
var missileFireRate : float = 0.5;
private var missileTimer : float = missileFireRate;
var missilePrefab : Transform;
var missileVelocity = Vector2(8,8);

//laser variables
var laserFireRate : float = 0.5;
var laserPrefab : Transform;
var laserVelocity = Vector2(5,5);
private var laserChargeTimer : float = 0.0;
var laserChargeTime : float = 3.0;
private var laserTimer : float = laserFireRate;

//flare variables
var flareFireRate : float = 5;
var flarePrefab : Transform;
var flareVelocity = Vector2(1,1);
private var flareTimer : float = flareFireRate;

//other variables
private var primaryActive : boolean = true;
private var secondaryActive : boolean = false;

private var missileActive : boolean = true;
private var laserActive : boolean = false;

var changeToMissile : KeyCode;
var changeToLaser : KeyCode;

var suber : GameObject;

function FixedUpdate () 
{
//Shoot/instantiate missile code
Physics2D.IgnoreLayerCollision(9,8);
Physics2D.IgnoreLayerCollision(9,9);
Physics2D.IgnoreLayerCollision(9,13);

//Start timers

		missileTimer += (Time.deltaTime * (1 / Time.timeScale));
		laserTimer += (Time.deltaTime * (1 / Time.timeScale));
		flareTimer += (Time.deltaTime * (1 / Time.timeScale));

if(Input.GetKeyDown(changeToMissile) && primaryActive == true)
	{
		missileActive = true;
		laserActive = false;
	}
	
else if(Input.GetKeyDown(changeToLaser) && primaryActive == true)
	{
		missileActive = false;
		laserActive = true;
	}

if(Input.GetKey(fireWeapon) && SubControl.isShotEnabled == true && laserActive == true)
	{
		laserChargeTimer += Time.deltaTime;
	}
	
if(!Input.GetKey(fireWeapon) && laserChargeTimer >= laserChargeTime)
	{
		laserChargeTimer = 0.0;
		if(laserTimer >= laserFireRate)
			{
//				Code generates Laser, and instantiates in the location of the Turret
				var laserInstance = Instantiate(laserPrefab, Vector3(transform.position.x, suber.transform.position.y, transform.position.z - 0.03), transform.rotation);
				laserInstance.rigidbody2D.velocity = Vector2.Scale(TurretRotation.difference, laserVelocity);
				laserTimer = 0;
			}
	}
	
else if(!Input.GetKey(fireWeapon) && laserChargeTimer < laserChargeTime)
	{
		laserChargeTimer = 0.0;
	}

if(Input.GetKey(fireWeapon) && SubControl.isShotEnabled == true)
	{
		if(primaryActive == true && missileActive == true)
			{
				if(missileTimer >= missileFireRate)	//Time.time is the time since frame has started
					{
						//Code generates Missile, and instantiates in the location of the Turret
						var missileInstance = Instantiate(missilePrefab, Vector3(transform.position.x, suber.transform.position.y, transform.position.z - 0.03), transform.rotation);
						missileInstance.rigidbody2D.velocity = Vector2.Scale(TurretRotation.difference, missileVelocity);
						missileTimer = 0;
					}
			}
		
		if(secondaryActive == true)
			{
				if(flareTimer >= flareFireRate)	//Time.time is the time since frame has started
					{
						//Code generates Missile, and instantiates in the location of the Turret
						var flareInstance = Instantiate(flarePrefab, Vector3(transform.position.x, suber.transform.position.y, transform.position.z - 0.03), transform.rotation);
						flareInstance.rigidbody2D.velocity = Vector2.Scale(TurretRotation.difference, flareVelocity);
						flareTimer = 0;
					}
			}
	}

if(Input.GetKeyDown(changeWeaponType))
	{
		primaryActive = !primaryActive;
		secondaryActive = !secondaryActive;
	}
}