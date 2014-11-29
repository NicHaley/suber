#pragma strict

var animator : Animator;

var delay : float = 2;
var projectileLifeSpan : float = 4;
private var timer : float = 0;
private var explosionTimer : float = 0;

var minIntensity : float = 0.5;
var maxIntensity : float = 5;
var minFlickerSpeed : float = 0.05;
var maxFlickerSpeed : float = 0.2;

function Start()
{
	animator = GetComponent(Animator);	//Allows you to access a variable from another script. ie. access the Move animation from the Animator
}

function OnCollisionEnter2D()
{
	GameObject.Destroy(GetComponent(CircleCollider2D));
	light.enabled = true;
	StartCoroutine(LightFlicker(Random.Range(minFlickerSpeed, maxFlickerSpeed)));
	rigidbody2D.velocity = Vector2(0,0);	
	animator.SetBool("missileCollision", true);
	yield WaitForSeconds(delay);
	Destroy(gameObject);
}

function Update()
{
	timer += Time.deltaTime;
	if(timer >= projectileLifeSpan)
		{
			explosionTimer += Time.deltaTime;
			light.enabled = true;
			StartCoroutine(LightFlicker(Random.Range(minFlickerSpeed, maxFlickerSpeed)));
			rigidbody2D.velocity = Vector2(0,0);
			animator.SetBool("missileCollision", true);
			if(explosionTimer >= delay)
				{
					Destroy(gameObject);
				}
		}
}

function LightFlicker(waitTime : float)
{
	while(light.enabled == true)
	{
	light.intensity = Random.Range(minIntensity, maxIntensity);
	yield WaitForSeconds(waitTime);
	}
}





