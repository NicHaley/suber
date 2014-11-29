#pragma strict

var maxLife : float = 10;
private var currLife : float;
var missileDamage : float = 1;
var laserDamage : float = 5;
var deathExplosionTime : float = 1;

var animator : Animator;

var VelThresh : float = 0;

var anglerLight : GameObject;
var energyOrb : Transform;

private var orbInstantiated = false;

function Start()
{
	currLife = maxLife;
	animator = GetComponent(Animator);	//Allows you to access a variable from another script. ie. access the Move animation from the Animator
}

function Update () 
{
	if(currLife <= 0.0)
		{
			animator.SetBool("anglerDeath", true);
			Destroy(anglerLight);
			Destroy(GetComponent(EnemyAI));
			Destroy(GetComponent(PolygonCollider2D));
			StartCoroutine(DestroyAngler());
			if(orbInstantiated == false)
				{
					var orbInstance = Instantiate(energyOrb, Vector3(transform.position.x, transform.position.y, transform.position.z), transform.rotation);
					orbInstantiated = true;
				}
		}
}
//
function OnCollisionEnter2D(collision : Collision2D)
{
	if(collision.gameObject.tag == "Missile")
		{
			currLife -= missileDamage;
		}
	if(collision.gameObject.tag == "Laser")
	{
		currLife -= laserDamage;
	}
}

function DestroyAngler()
{
	yield WaitForSeconds(deathExplosionTime);
	Destroy(gameObject);
//	var orbInstance = Instantiate(energyOrb, Vector3(transform.position.x, transform.position.y, transform.position.z), transform.rotation);
}

	
	