#pragma strict

static var maxLife : float = 5;
static var currLife : float = maxLife;
static var damageNormal : float = 1;
var anglerDamage = 1.5;
var healthPackLife = 2.5;

var VelThresh : float = 0;

var smoke1 : GameObject;
var smoke2 : GameObject;
var healthPack : GameObject;
var turret : GameObject;

function Update () 
{
	if(currLife > maxLife)
		{
			currLife = maxLife;
		}

	if(currLife <= 0.0)
		{
			Destroy(gameObject);
			Destroy(turret);
		}
		
	if(currLife/maxLife >= 0.25 && currLife/maxLife <= 0.5)
		{
			smoke1.particleSystem.emissionRate = 40;
		}
	if(currLife/maxLife < 0.25)
		{
			smoke1.particleSystem.emissionRate = 50;
			smoke2.particleSystem.emissionRate = 80;
		}
	else if(currLife/maxLife >0.5)
		{
			smoke1.particleSystem.emissionRate = 0;
			smoke2.particleSystem.emissionRate = 0;
		}
}
//
function OnCollisionEnter2D(collision : Collision2D)
{
	if(collision.relativeVelocity.magnitude >= VelThresh && collision.gameObject.tag != "HealthPack" && collision.gameObject.tag != "Orb")
		{
			currLife -= damageNormal;
		}
	if(collision.gameObject.tag == "Angler")
		{
			currLife -= anglerDamage;
		}
	if(collision.gameObject.tag == "HealthPack")
		{
			currLife += healthPackLife;
			Destroy(healthPack);
		}
}

	
	
	