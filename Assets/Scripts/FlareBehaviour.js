#pragma strict

var projectileLifeSpan : float = 4;
private var destroyTimer : float = 0;

var minIntensity : float = 0.5;
var maxIntensity : float = 5;
var minFlickerSpeed : float = 0.05;
var maxFlickerSpeed : float = 0.2;

function Update()
{
	destroyTimer += Time.deltaTime;
	light.enabled = true;
	StartCoroutine(LightFlicker(Random.Range(minFlickerSpeed, maxFlickerSpeed)));
	if(destroyTimer >= projectileLifeSpan)
		{
			Destroy(gameObject);
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
