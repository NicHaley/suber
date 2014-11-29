#pragma strict

var orbSpeed = Vector2(5, 5);
var orbRange : float = 2;
private var isFollowing = false;

var timeAdd : int = 15;

function Update () 
{
	var orbPos : Vector2 = transform.position;
	var subPos : Vector2 = GameObject.Find("Suber").transform.position;
	
	var distanceToSub : float = Vector2.Distance(subPos, orbPos);

	var posDifferenceSub : Vector2 = subPos - orbPos;
	
	posDifferenceSub.Normalize();
	
	if (distanceToSub < orbRange)
		{
			isFollowing = true;
		}
	if (isFollowing == true)
		{
			rigidbody2D.AddForce(Vector2.Scale (posDifferenceSub, orbSpeed));		//Follow target
		}
}

function OnCollisionEnter2D(collision : Collision2D)
{
    if(collision.gameObject.tag == "Player")
	    {
	    	Destroy(gameObject);
	    	GameObject.FindWithTag("Timer").GetComponent(TextTimer).timer += timeAdd;
	    }
}
	