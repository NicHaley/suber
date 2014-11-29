
var target : Transform;
var moveSpeed = 5.0;

var lookAtDisitanceInital : float = 3.0;
var lookAtDistanceFinal : float = 4.0;
private var lookAtDistance : float;

var attackRangeInitial : float = 2.0;
var attackRangeFinal : float = 2.0;		//A larger attack range once fish has started attacking
private var attackRange : float;

private var isColliding : boolean = false;
private var enemyStartPos : Vector2;

var colour1 : Color;
var colour2 : Color;

var attackSlowDownMultiplier : float = 2;
var attackSlowDownTime : float = 0.7;

var anglerLight : GameObject;

function Start()
{
	enemyStartPos = transform.position;
	anglerLight.light.color = colour1;
}

function Update () 
{	
	var enemyPos : Vector2 = transform.position;
	var subPos : Vector2 = target.position;
	
	var distanceToSub : float = Vector2.Distance(subPos, enemyPos);
	var distanceToStart : float = Vector2.Distance(enemyStartPos, enemyPos);

	var posDifferenceSub : Vector2 = subPos - enemyPos;
	var posDifferenceStart : Vector2 = enemyStartPos - enemyPos;
	
	posDifferenceSub.Normalize();
	posDifferenceStart.Normalize();
	
//	docileRoutine();
	
	if (distanceToSub < lookAtDistance)	//within enemies sight but not necessarily attack range
		{
			anglerLight.light.color = colour2;
			lookAtDistance = lookAtDistanceFinal;
			lookAtSub ();
		}
		
	if (distanceToSub > lookAtDistance)		//Ignore player
		{
			lookAtDistance = lookAtDisitanceInital;
			anglerLight.light.color = colour1;
		}
	
	if (distanceToSub < attackRange || isColliding == true)
		{
			anglerLight.light.color = colour2;
			attackRange = attackRangeFinal;
			rigidbody2D.AddForce (posDifferenceSub * moveSpeed);		//Follow target
			lookAtSub();
		}
		
	if (distanceToSub > attackRange)
		{
			attackRange = attackRangeInitial;
			isColliding = false;
		}
	if (distanceToSub > attackRange && distanceToSub > lookAtDistance)
		{		
			if(distanceToStart > 0.1)
				{
					anglerLight.light.color = colour1;
					rigidbody2D.AddForce (posDifferenceStart * moveSpeed);		//Return to initial position
					lookAtStart();
				}
		}
}

function lookAtSub ()
{
	if (target.position.x < transform.position.x)
		{
			transform.localScale.x = 1;
		}
	else
		{
			transform.localScale.x = -1;
		}
}

function lookAtStart ()
{
	if (enemyStartPos.x < transform.position.x)
		{
			transform.localScale.x = 1;
		}
	else
		{
			transform.localScale.x = -1;
		}
}

function docileRoutine ()
{

}

function OnCollisionEnter2D(collision : Collision2D)
{
	if(collision.gameObject.tag == "Missile" || collision.gameObject.tag == "Laser")
    {
		isColliding = true;
    }
    if(collision.gameObject.tag == "Player")
    {
    	moveSpeed = moveSpeed / attackSlowDownMultiplier;
    	yield WaitForSeconds(attackSlowDownTime);
    	moveSpeed = moveSpeed * attackSlowDownMultiplier;
    }
}
	











